/**
 * @param fileContent - String. Raw string from file; formatted to get the Buzzword Bingo cells.
 * @throws if the file content is not of type 'string'.
 */
export default function getTerms(fileContent) {
    if (typeof fileContent === 'string') {
        const cells = fileContent.split(/\r\n|\r|\n/);

        return cells;
    } else {
        throw new Error('File contents must be of type \'string\'.');
    }
}