/**
 * @param props
 * - property table: 5x5 array to create the table from.
 */
export default function Table(props) {
    const { table } = props;
    const tableRows = table.map((row, i) => {
        const cellNumber = i * 5;
        const cells = row.map((cell, j) =>
            <td key={cellNumber + j}>
                {cell}
                <input type="checkbox" />
            </td>
        );

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
        `}</style>
        </table>
    );
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