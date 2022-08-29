import Head from 'next/head'
import { useState } from 'react';

import ErrorMessages from '../components/error-messages/index';
import FileInput from '../components/file-input/index';
import Randomize from '../components/randomize/index';
import RegexFormatter from '../components/regex-formatter';
import Table, { createMetaTable } from '../components/table/index';
import randomizeTerms from '../utils/randomize-terms.function';

export default function Home() {
  const initialState = {
    // Number of cells to render. For now strict limit is 24 (+ 1 "Free square!")
    cells: [],
    // Regex to format cells in case there are markings the user would not want. Whatever matches the expression will be removed.
    formatRegex: '[0-9]*\. ',
    // Whether this is the first time the component is rendered.
    initial: true,
    // Error messages to render to the user.
    errorMessages: [],
  };

  const [state, setState] = useState(initialState);

  const {
    cells = [],
    formatRegex = '[0-9]*\. ',
    initial = false,
    errorMessages = [],
  } = state;

  // Optional UI elements.
  let table, randomize, errorMessageUI;
  if (cells.length === 24) {
    let tableCells = cells;

    if (formatRegex) {
      tableCells = formatCells(cells, formatRegex);
    }

    tableCells = randomizeTerms(tableCells);

    const metaTable = createMetaTable(tableCells);

    table = <Table table={metaTable} />;

    randomize = <Randomize randomizeFn={randomizeFn} />
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
        <RegexFormatter initialValue={formatRegex} />
        {table}
        {randomize}
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
  );

  function randomizeFn() {
    setState({ cells: randomizeTerms(cells) });
  }

  /**
   *
   * @param {*} cells
   */
  function formatCells(cells, replaceExpression) {
    const regExp = new RegExp(replaceExpression);

    return cells.map(cell => {
      return cell.replace(regExp, '');
    });
  }
}
