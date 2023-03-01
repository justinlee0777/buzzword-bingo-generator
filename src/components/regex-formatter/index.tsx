import styles from './index.module.css';

interface RegexFormatterProps {
  initialValue: string;
  onChange: (input: string) => void;
}

export default function RegexFormatter({
  initialValue,
  onChange,
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
        aria-label="Use this input to transform the loaded bingo sheet's cells. The string is translated to Javascript RegExp."
        value={initialValue}
        onChange={(element) => onChange(element.target.value)}
      />
    </div>
  );
}
