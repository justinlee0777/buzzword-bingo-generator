export enum BingoErrorType {
  REGEX = 'RegexError',
  CELL_COUNT = 'CellCountError',
  INPUT = 'InputError',
}

export interface BingoError {
  type: BingoErrorType;
  message: string;
}
