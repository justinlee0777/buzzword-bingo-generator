import styles from './index.module.css';

import { useState } from 'react';

const freeCellImageSymbol = new RegExp('!image');

interface TableProps {
  table: Array<Array<string>>;
  sheetSideSize: number;
  freeCell?: string;
}

/**
 * @param props
 * - property table: 5x5 array to create the table from.
 * - property freeCell: overridden free cell.
 */
export default function Table({
  table,
  freeCell,
  sheetSideSize,
}: TableProps): JSX.Element {
  const sheetSize = sheetSideSize ** 2;
  const shouldReplaceFreeCell = sheetSize % 2 === 1;
  const freeSquareIndex = Math.ceil(sheetSize / 2) - 1;

  const tableRows = table.map((row, i) => {
    const rowNumber = i * 5;
    const cells = row.map((cell, j) => {
      const cellNumber = rowNumber + j;
      if (shouldReplaceFreeCell && cellNumber === freeSquareIndex) {
        if (isImage(freeCell)) {
          const imageUrl = freeCell.replace(freeCellImageSymbol, '');
          return <TableCell key={cellNumber} cellImage={imageUrl} />;
        }
      }
      return <TableCell key={cellNumber} cellText={cell} />;
    });

    return <tr key={i}>{cells}</tr>;
  });

  return (
    <table className={styles.table}>
      <tbody>{tableRows}</tbody>
    </table>
  );
}

interface TableCellProps {
  // Must be provided if 'cellImage' is not.
  cellText?: string;
  // Must be provided if 'cellText' is not.
  cellImage?: string;
}

function TableCell({ cellText, cellImage }: TableCellProps) {
  const [isActive, setActive] = useState(false);

  let cellContent;
  if (cellText) {
    cellContent = <span>{cellText}</span>;
  } else {
    cellContent = <img src={cellImage} width="100%" />;
  }

  return (
    <td
      className={`${styles.tableCell} ${isActive ? styles.active : ''}`}
      onClick={() => setActive(!isActive)}
    >
      {cellContent}
    </td>
  );
}

function isImage(freeCell: string): boolean {
  return freeCellImageSymbol.test(freeCell);
}

/**
 * @params terms - Array<string>. Cells to format.
 */
export function createMetaTable(
  terms: Array<string>,
  sheetSideSize: number
): Array<Array<string>> {
  if (sheetSideSize % 2 === 1) {
    // Always add "Free square!" for odd-number sided sheets. It is expected it will later be replaced.
    terms = [].concat(terms.slice(0, 12), 'Free square!', terms.slice(12, 24));
  }

  return Array(sheetSideSize)
    .fill(undefined)
    .map((_, i) => {
      const begin = i * sheetSideSize;
      const end = begin + sheetSideSize;

      return terms.slice(begin, end);
    });
}
