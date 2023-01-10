import { useState } from 'react';

const freeCellImageSymbol = new RegExp('\!image');

/**
 * @param props
 * - property table: 5x5 array to create the table from.
 * - property freeCell: overridden free cell.
 */
export default function Table(props) {
    const { table, freeCell } = props;

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
        <table>
            <tbody>{tableRows}</tbody>
            <style jsx global>{`
                table, th, td {
                    border: 1px solid black;
                    border-collapse: collapse;
                }

                td {
                    cursor: pointer;
                    padding: 8px;
                    text-align: center;
                    user-select: none;
                    width: 20%;
                }

                td.active {
                    background-color: darkblue;
                    color: white;
                }
        `}</style>
        </table>
    );
}

/**
 * 
 * @param {*} props
 * - cellText - falsy if 'cellImage' is provided.
 * - cellImage - falsy if 'cellText' is provided.
 */
function TableCell(props) {
    const { cellText, cellImage } = props;

    const [isActive, setActive] = useState(false);

    let cellContent;
    if (cellText) {
        cellContent = <span>{cellText}</span>;
    } else {
        cellContent = <img src={cellImage} width="100%" />;
    }

    return <td className={isActive ? 'active' : ''} onClick={() => setActive(!isActive)}>
        {cellContent}
    </td>;
}

function isImage(freeCell) {
    return freeCellImageSymbol.test(freeCell);
}

/**
 * @params terms - Array<string>. Cells to format.
 */
export function createMetaTable(terms) {
    if (typeof terms !== 'object' && !('length' in terms)) {
        return [];
    }

    return [
        terms.slice(0, 5),
        terms.slice(5, 10),
        // Center square is always 'Free square!'
        terms.slice(10, 12).concat('Free square!', terms.slice(12, 14)),
        terms.slice(14, 19),
        terms.slice(19, 24),
    ];
}