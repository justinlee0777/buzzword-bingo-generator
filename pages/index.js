import Head from 'next/head'
import { useState } from 'react';

export default function Home() {
  const initialState = {
    // Number of cells to render. For now strict limit is 24 (+ 1 "Free square!")
    cells: [],
    // Whether this is the first time the component is rendered.
    initial: true,
    // Error messages to render to the user.
    errorMessages: [],
  };

  const [state, setState] = useState(initialState);

  function onInputChange(file) {
    readFile(file)
      .then(fileContent => {
        const terms = getTerms(fileContent);
        const cells = randomizeTerms(terms);
        setState({ cells });
      })
      .catch(error => {
        setState({ errorMessages: [error.message] });
      });
  }

  const {
    cells = [],
    initial = false,
    errorMessages = [],
  } = state;

  // Optional UI elements.
  let table, randomizeAgain, errorMessageUI;
  if (cells.length === 24) {
    const metaTable = createMetaTable(state.cells);

    table = createUITable(metaTable);

    function randomizeAgainFn() {
      setState({ cells: randomizeTerms(cells) });
    }

    randomizeAgain = <button onClick={randomizeAgainFn}>Randomize again</button>;
  } else if (!initial) {
    errorMessages.push('Text file must have 24 rows.');
  }

  if (errorMessages.length > 0) {
    errorMessageUI = <span className="error-message">{errorMessages.join('\n')}</span>;
  }

  return (
    <div className="container">
      <Head>
        <title>Buzzword Bingo Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <input type="file" accept=".txt" onChange={event => onInputChange(event.target.files[0])} />
        {table}
        {randomizeAgain}
        {errorMessageUI}
      </main>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
        }

        * {
          box-sizing: border-box;
        }

        table, th, td {
          border: 1px solid black;
          border-collapse: collapse;
        }

        .error-message {
          color: red;
        }
      `}</style>
    </div>
  )
}

/**
 * @returns a Promise that resolves when the file's text is read.
 */
function readFile(file) {
  const fileReader = new FileReader();

  return new Promise(resolve => {
    fileReader.addEventListener('load', event => {
      resolve(event.target.result);
    });

    fileReader.readAsText(file);
  });
}

/**
 *  @throws if the file content is not of type 'string'.
 */
function getTerms(fileContent) {
  if (typeof fileContent === 'string') {
    const cells = fileContent.split(/\r\n|\r|\n/);

    return cells;
  } else {
    throw new Error('File contents must be of type \'string\'.');
  }
}

/**
 * Implementing Knuth shuffle @see @url https://en.wikipedia.org/wiki/Fisher–Yates_shuffle
 */
function randomizeTerms(terms) {
  const randomizedTerms = [...terms];

  const length = randomizedTerms.length;
  const endIndex = length - 1;

  for (let i = 0; i < endIndex; i++) {
    const index = Math.floor(
      Math.random() * (length - i) + i
    );

    const cache = randomizedTerms[i];
    randomizedTerms[i] = randomizedTerms[index];
    randomizedTerms[index] = cache;
  }

  return randomizedTerms;
}

function createMetaTable(terms) {
  if (typeof terms !== 'object' && !('length' in terms)) {
    return [];
  }

  return [
    terms.slice(0, 5),
    terms.slice(5, 10),
    // Center square is always 'Free square!'
    terms.slice(10, 12).concat('Free square!', terms.slice(12, 14)),
    terms.slice(14, 19),
    terms.slice(19, 24),
  ];
}

/**
 * @returns a 5x5 array with unique keys based on index.
 */
function createUITable(table) {
  const tableRows = table.map((row, i) => {
    const cellNumber = i * 5;
    const cells = row.map((cell, j) => <td key={cellNumber + j}>{cell}</td>);

    return <tr key={i}>{cells}</tr>;
  });

  return <table><tbody>{tableRows}</tbody></table>;
}
