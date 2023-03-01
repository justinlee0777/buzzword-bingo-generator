import styles from './index.module.css';

export interface RandomizeProps {
  randomizeFn: () => void;
}

export default function Randomize({
  randomizeFn,
}: RandomizeProps): JSX.Element {
  return (
    <button
      className={styles.randomize}
      onClick={randomizeFn}
      aria-label="Randomize your loaded bingo-sheet again"
    >
      Randomize again
    </button>
  );
}
