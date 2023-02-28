import styles from './index.module.css';

import { useState } from 'react';
import * as classNames from 'classnames';

import getTerms from '../../utils/get-terms.function';
import readFile from '../../utils/read-file.function';

export interface FileInputResult {
  cells?: Array<string>;
  errorMessages?: Array<string>;
}

interface FileInputProps {
  callback?: (cellsOrErrors: FileInputResult) => void;
}

/**
 * @param props - property 'callback': Unary function. Sole argument is the state change to propagate to the parent component.
 */
export default function FileInput({ callback }: FileInputProps): JSX.Element {
  function onInputChange(file: File): void {
    readFile(file)
      .then((fileContent) => {
        const terms = getTerms(fileContent);
        const cells = terms;

        return { cells };
      })
      .catch((error) => {
        return { errorMessages: [error.message] };
      })
      .then((state) => {
        callback?.(state);
      });
  }

  const [helpOpened, setHelpOpened] = useState(false);

  const helpOpenedClassName = {
    [styles.helpOpened]: helpOpened,
  };

  const helpClassName = classNames(styles.help, helpOpenedClassName);

  const helpTextClassName = classNames(styles.helpText, helpOpenedClassName);

  return (
    <>
      <label className={styles.pseudoButton}>
        <input
          className={styles.fileInput}
          type="file"
          accept=".txt"
          onChange={(event) => onInputChange(event.target.files[0])}
        />
        Load bingo files (.txt)
      </label>
      <button
        className={helpClassName}
        onClick={() => setHelpOpened(!helpOpened)}
      >
        ?
      </button>
      <p className={helpTextClassName}>
        <p>Example text file:</p>
        <code className={styles.textSample}>
          <p>1. foo</p>
          <p>2. bar</p>
          <p>3. baz</p>
          <p>[...]</p>
        </code>
      </p>
    </>
  );
}
