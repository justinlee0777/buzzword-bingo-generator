import styles from './index.module.css';

interface RegexFormatterProps {
  initialValue: string;
}

/**
 * @param props
 * TODO: Disabling the input for now and setting it with a preset value. Need to get a better understanding of how to do
 * event listeners in React.
 */
export default function RegexFormatter({
  initialValue,
}: RegexFormatterProps): JSX.Element {
  return (
    <div className={styles.regexFormatter}>
      <div className={styles.inputContainer}>
        <input className={styles.input} disabled value={initialValue} />
        <span className={`${styles.tick} ${styles.tickLeft}`}>/</span>
        <span className={`${styles.tick} ${styles.tickRight}`}>/</span>
      </div>
    </div>
  );
}
