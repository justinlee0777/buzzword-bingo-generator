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

  function readFile(file) {
    const fileReader = new FileReader();

    fileReader.addEventListener('load', event => {
      let result;
      if (typeof (result = event.target.result) === 'string') {
        const cells = event.target.result.split(/\r\n|\r|\n/);
        setState({ cells });
      } else {
        const errorMessages = [
          'File contents must be of type \'string\'.',
        ];
        setState({ errorMessages });
      }
    });

    fileReader.readAsText(file);
  }

  const {
    cells = [],
    initial = false,
    errorMessages = [],
  } = state;

  let table;
  if (cells.length === 24) {
    const metaTable = createMetaTable(state.cells);

    table = createUITable(metaTable);
  } else if (!initial) {
    errorMessages.push('Text file must have 24 rows.');
  }

  let errorMessageUI;

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
        <input type="file" accept=".txt" onChange={event => readFile(event.target.files[0])} />
        {table}
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
