import Head from 'next/head'
import { useState } from 'react';

import ErrorMessages from '../components/error-messages/index';
import FileInput from '../components/file-input/index';
import RandomizeAgain from '../components/randomize-again/index';
import Table, { createMetaTable } from '../components/table/index';
import randomizeTerms from '../utils/randomize-terms.function';

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

  const {
    cells = [],
    initial = false,
    errorMessages = [],
  } = state;

  // Optional UI elements.
  let table, randomizeAgain, errorMessageUI;
  if (cells.length === 24) {
    const metaTable = createMetaTable(state.cells);

    table = <Table table={metaTable} />;

    function randomizeAgainFn() {
      setState({ cells: randomizeTerms(cells) });
    }

    randomizeAgain = <RandomizeAgain randomizeAgainFn={randomizeAgainFn} />
  } else if (!initial) {
    errorMessages.push('Text file must have 24 rows.');
  }

  if (errorMessages.length > 0) {
    errorMessageUI = <ErrorMessages messages={errorMessages} />;
  }

  return (
    <div className="container">
      <Head>
        <title>Buzzword Bingo Generator</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <FileInput callback={setState} />
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
      `}</style>
    </div>
  )
}
