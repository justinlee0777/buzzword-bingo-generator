import Head from 'next/head';
import { useState } from 'react';

import ErrorMessages from '../components/error-messages/index';
import FileInput, { FileInputResult } from '../components/file-input/index';
import Randomize from '../components/randomize/index';
import RegexFormatter from '../components/regex-formatter/index';
import Table, { createMetaTable } from '../components/table/index';
import randomizeTerms from '../utils/randomize-terms.function';

export default function Home(): JSX.Element {
  // Number of cells to render. For now strict limit is 24 (+ 1 "Free square!")
  const [cells, setCells] = useState<Array<string>>([]);
  // If null, then randomize 'cells'.
  const [randomizedCells, setRandomizedCells] = useState<Array<string> | null>(
    null
  );
  const [freeCell, setFreeCell] = useState<string | undefined>(undefined);
  // Regex to format cells in case there are markings the user would not want. Whatever matches the expression will be removed.
  const [formatRegex, setFormatRegex] = useState('[0-9]*[.)] ');
  // Error messages to render to the user.
  const [errorMessages, setErrorMessages] = useState<Array<string>>([]);

  let table, randomizedTable, errorMessageUI;

  if (errorMessages.length === 0) {
    if (cells.length > 0) {
      const preformattedMetaTable = createMetaTable(cells);
      table = <Table table={preformattedMetaTable} freeCell={freeCell} />;
    }

    if (randomizedCells) {
      const metaTable = createMetaTable(randomizedCells);

      randomizedTable = (
        <>
          <div className="down-arrow"></div>
          <Table table={metaTable} freeCell={freeCell} />
          <Randomize randomizeFn={() => randomizeFn(cells)} />;
        </>
      );
    }
  } else {
    errorMessageUI = <ErrorMessages messages={errorMessages} />;
  }

  return (
    <div className="container">
      <Head>
        <title>Buzzword Bingo Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main style={{ width: '80%' }}>
        <FileInput callback={onFileInputCallback} />
        <RegexFormatter initialValue={formatRegex} />
        {table}
        {randomizedTable}
        {errorMessageUI}
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }

        main {
          display: inline-flex;
          flex-direction: column;
          min-width: 600px;
        }

        .down-arrow {
          border: 20px solid;
          border-color: black transparent transparent transparent;
          height: 0;
          margin: 8px auto -12px;
          width: 0;

          > div:first-of-type {
            width: 40px;
            height: 40px;
            border-left: 1px solid black;
            border-top: 1px solid black;
            border-right: 1px solid black;
            margin: auto;
          }
        }
      `}</style>
    </div>
  );

  function onFileInputCallback(result: FileInputResult): void {
    const { cells: resultCells, errorMessages: resultErrorMessages } = result;

    let newErrorMessages = [];
    if (resultCells) {
      if (tableHasCorrectLength(resultCells)) {
        const [filteredCells, freeCell] = getFreeCell(resultCells);

        setCells(filteredCells);
        setFreeCell(freeCell);
        randomizeFn(filteredCells);
      } else {
        newErrorMessages = errorMessages.concat('Text file must have 24 rows.');
      }
      setErrorMessages(newErrorMessages);
    } else if (resultErrorMessages) {
      setErrorMessages(resultErrorMessages);
    }
  }

  function randomizeFn(cellsToRandomize: Array<string>) {
    setRandomizedCells(
      randomizeTerms(formatCells(cellsToRandomize, formatRegex))
    );
  }
}

function tableHasCorrectLength(cells: Array<string>): boolean {
  const { length } = cells;
  return length === 24 || length === 25;
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

function formatCells(
  cells: Array<string>,
  replaceExpression: string
): Array<string> {
  const regExp = new RegExp(replaceExpression);

  return cells.map((cell) => {
    return cell.replace(regExp, '');
  });
}
