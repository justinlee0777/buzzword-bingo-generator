import styles from './index.module.css';

import { useState } from 'react';

const freeCellImageSymbol = new RegExp('!image');

interface TableProps {
  table: Array<Array<string>>;
  freeCell?: string;
}

/**
 * @param props
 * - property table: 5x5 array to create the table from.
 * - property freeCell: overridden free cell.
 */
export default function Table({ table, freeCell }: TableProps): JSX.Element {
  const freeSquareIndex = Math.ceil(25 / 2) - 1;

  const tableRows = table.map((row, i) => {
    const rowNumber = i * 5;
    const cells = row.map((cell, j) => {
      const cellNumber = rowNumber + j;
      if (cellNumber === freeSquareIndex) {
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
      className={`${styles.tableCell} ${isActive ? 'active' : ''}`}
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
export function createMetaTable(terms: Array<string>): Array<Array<string>> {
  return [
    terms.slice(0, 5),
    terms.slice(5, 10),
    // Center square is always 'Free square!'
    terms.slice(10, 12).concat('Free square!', terms.slice(12, 14)),
    terms.slice(14, 19),
    terms.slice(19, 24),
  ];
}
