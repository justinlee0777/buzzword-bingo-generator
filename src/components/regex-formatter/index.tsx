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
  const inputId = 'regex-input';
  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabel} htmlFor={inputId}>
        The value is converted to Javascript RegExp and used to sanitize the
        cells.
      </label>
      <input
        id={inputId}
        className={styles.input}
        disabled
        value={initialValue}
      />
    </div>
  );
}
