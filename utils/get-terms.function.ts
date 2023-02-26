/**
 * @param fileContent - String. Raw string from file; formatted to get the Buzzword Bingo cells.
 */
export default function getTerms(fileContent: string): Array<string> {
    const cells = fileContent.split(/\r\n|\r|\n/);

    return cells;
}