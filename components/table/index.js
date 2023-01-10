import { useState } from 'react';

/**
 * @param props
 * - property table: 5x5 array to create the table from.
 */
export default function Table(props) {
    const { table } = props;
    const tableRows = table.map((row, i) => {
        const cellNumber = i * 5;
        const cells = row.map((cell, j) => {
            return <TableCell key={cellNumber + j} cellText={cell} />;
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

function TableCell(props) {
    const { cellText } = props;

    const [isActive, setActive] = useState(false);

    return <td className={isActive ? 'active' : ''} onClick={() => setActive(!isActive)}>
        {cellText}
    </td>;
}

/**
 * @params terms - Array<string>. Cells to format.
 * @params freeCell - optional. Overrides the "Free square!"
 */
export function createMetaTable(terms, freeCell = 'Free square!') {
    if (typeof terms !== 'object' && !('length' in terms)) {
        return [];
    }

    return [
        terms.slice(0, 5),
        terms.slice(5, 10),
        // Center square is always 'Free square!'
        terms.slice(10, 12).concat(freeCell, terms.slice(12, 14)),
        terms.slice(14, 19),
        terms.slice(19, 24),
    ];
}