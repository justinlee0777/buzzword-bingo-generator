import styles from './index.module.css';

export interface BingoSheetFile {
  name: string;
  path: string;
}

export interface LoadSheetsProps {
  options: Array<BingoSheetFile>;
  onLoadUrl: (path: string) => void;
}

export default function LoadSheets({
  options,
  onLoadUrl,
}: LoadSheetsProps): JSX.Element {
  const loadDefaults = options.map((option) => (
    <button
      className={styles.loadDefaultSheet}
      key={option.name}
      aria-label={`Load ${option.name} bingo sheet`}
      onClick={() => onLoadUrl(option.path)}
    >
      {option.name}
    </button>
  ));

  return (
    <div className={styles.loadSheetsContainer}>
      Load default:
      {loadDefaults}
    </div>
  );
}
