import styles from './index.module.css';

export interface ErrorMessagesProp {
  messages: Array<string>;
}

export default function ErrorMessages({
  messages,
}: ErrorMessagesProp): JSX.Element {
  return <span className={styles.errorMessage}>{messages.join('\n')}</span>;
}
