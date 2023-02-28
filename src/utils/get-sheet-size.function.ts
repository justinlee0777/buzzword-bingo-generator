const maxSideSize = 5;

/**
 * @returns the size of a side of a two-dimensional sheet from a flattened one-dimensional sheet
 * @throws an error if the sheet's size is invalid.
 */
export function getSheetSize(sheet: Array<string>): number {
  const sheetLength = sheet.length;
  let currentSideSize = maxSideSize;

  const validSheetSizes: Array<number> = [];

  while (currentSideSize > 0) {
    const totalSize = currentSideSize ** 2;

    let matches = false;
    if (totalSize % 2 === 1) {
      // If the total size is odd, the free cell can be included or omitted.
      const withFreeCell = totalSize;
      const withoutFreeCell = totalSize - 1;

      matches = withFreeCell === sheetLength || withoutFreeCell === sheetLength;

      validSheetSizes.unshift(withoutFreeCell, withFreeCell);
    } else {
      matches = totalSize === sheetLength;

      validSheetSizes.unshift(totalSize);
    }

    if (matches) {
      return currentSideSize;
    }

    currentSideSize--;
  }

  throw new Error(
    `The sheet does not have a valid number of cells. It must have in total: ${validSheetSizes.join(
      ', '
    )} cells.`
  );
}
