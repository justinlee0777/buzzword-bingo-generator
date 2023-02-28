import styles from './index.module.css';

import { useState } from 'react';

import ErrorMessages from './components/error-messages/index';
import FileInput, { FileInputResult } from './components/file-input/index';
import Randomize from './components/randomize/index';
import RegexFormatter from './components/regex-formatter/index';
import Table, { createMetaTable } from './components/table/index';
import randomizeTerms from './utils/randomize-terms.function';
import { BingoError, BingoErrorType } from './bingo-error.model';
import { getSheetSize } from './utils/get-sheet-size.function';

export default function BuzzwordBingo(): JSX.Element {
  // Number of cells to render. For now strict limit is 24 (+ 1 "Free square!")
  const [cells, setCells] = useState<Array<string>>([]);
  const [sheetSideSize, setSheetSideSize] = useState<number>(0);
  // If null, then randomize 'cells'.
  const [randomizedCells, setRandomizedCells] = useState<Array<string> | null>(
    null
  );
  const [freeCell, setFreeCell] = useState<string | undefined>(undefined);
  // Regex to format cells in case there are markings the user would not want. Whatever matches the expression will be removed.
  const [formatRegex, setFormatRegex] = useState('[0-9]*[.)] ');
  // Error messages to render to the user.
  const [errors, setErrors] = useState<Array<BingoError>>([]);

  let regExp: RegExp;

  let newErrors: Array<BingoError> = [...errors];

  try {
    regExp = new RegExp(formatRegex);
  } catch (error) {
    if (newErrors.every((error) => error.type !== BingoErrorType.REGEX)) {
      newErrors = newErrors.concat({
        type: BingoErrorType.REGEX,
        message: error.message,
      });
    }
  }

  if (newErrors.length !== errors.length) {
    setErrors(newErrors);
    return <></>;
  }

  let table, randomizedTable, errorMessageUI;

  if (errors.length === 0) {
    if (cells.length > 0) {
      const preformattedMetaTable = createMetaTable(cells, sheetSideSize);
      table = (
        <Table
          table={preformattedMetaTable}
          freeCell={freeCell}
          sheetSideSize={sheetSideSize}
        />
      );
    }

    if (randomizedCells) {
      const metaTable = createMetaTable(
        formatCells(randomizedCells, regExp),
        sheetSideSize
      );

      randomizedTable = (
        <>
          <div className={styles.downArrow}>{String.fromCharCode(8595)}</div>
          <Table
            table={metaTable}
            freeCell={freeCell}
            sheetSideSize={sheetSideSize}
          />
          <Randomize randomizeFn={() => randomizeFn(cells)} />
        </>
      );
    }
  } else {
    errorMessageUI = <ErrorMessages messages={errors} />;
  }

  return (
    <div className="container">
      <main className={styles.content}>
        <FileInput callback={onFileInputCallback} />
        <RegexFormatter
          initialValue={formatRegex}
          onChange={(regex) => {
            setFormatRegex(regex);
            setErrors(
              errors.filter((error) => error.type !== BingoErrorType.REGEX)
            );
          }}
        />
        {table}
        {randomizedTable}
        {errorMessageUI}
      </main>
    </div>
  );

  function onFileInputCallback(result: FileInputResult): void {
    const { cells: resultCells, errorMessages: resultErrorMessages } = result;

    let newErrorMessages = [];
    if (resultCells) {
      let sideSize: number;

      try {
        sideSize = getSheetSize(resultCells);

        const [filteredCells, freeCell] = getFreeCell(resultCells);

        setCells(filteredCells);
        setSheetSideSize(sideSize);
        setFreeCell(freeCell);
        randomizeFn(filteredCells);
      } catch (error) {
        newErrorMessages = errors.concat({
          type: BingoErrorType.CELL_COUNT,
          message: error.message,
        });
      }
      setErrors(newErrorMessages);
    } else if (resultErrorMessages) {
      setErrors(
        resultErrorMessages.map((message) => ({
          message,
          type: BingoErrorType.INPUT,
        }))
      );
    }
  }

  function randomizeFn(cellsToRandomize: Array<string>) {
    setRandomizedCells(randomizeTerms(cellsToRandomize));
  }
}

/**
 * @returns both the cells without Free! and the free cell
 */
function getFreeCell(tableCells: Array<string>): [Array<string>, string?] {
  const freeCellMarker = new RegExp('free[.)] ', 'i');
  const index = tableCells.findIndex((tableCell) =>
    freeCellMarker.test(tableCell)
  );
  if (index >= 0) {
    const freeCell = tableCells[index];
    return [
      [...tableCells.slice(0, index), ...tableCells.slice(index + 1)],
      freeCell.replace(freeCellMarker, ''),
    ];
  } else {
    return [tableCells];
  }
}

function formatCells(cells: Array<string>, regExp: RegExp): Array<string> {
  return cells.map((cell) => {
    return cell.replace(regExp, '');
  });
}
