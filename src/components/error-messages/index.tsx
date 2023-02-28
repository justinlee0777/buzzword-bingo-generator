import styles from './index.module.css';

import { BingoError } from '../../bingo-error.model';

export interface ErrorMessagesProp {
  messages: Array<BingoError>;
}

export default function ErrorMessages({
  messages,
}: ErrorMessagesProp): JSX.Element {
  const errorMessages = messages.map((message) => (
    <span key={message.type}>{message.message}</span>
  ));

  return <div className={styles.errorMessages}>{errorMessages}</div>;
}
