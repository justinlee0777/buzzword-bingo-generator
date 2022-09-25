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
    // If null, then randomize 'cells'.
    randomizedCells: null,
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
    randomizedCells = null,
    formatRegex = '[0-9]*\. ',
    initial = false,
    errorMessages = [],
  } = state;

  // Optional UI elements.
  let tables, randomize, errorMessageUI;
  if (cells.length === 24) {
    let tableCells = cells;

    const preformattedMetaTable = createMetaTable(tableCells);

    if (formatRegex) {
      tableCells = formatCells(cells, formatRegex);
    }

    if (Array.isArray(randomizedCells)) {
      tableCells = randomizedCells;
    } else {
      tableCells = randomizeTerms(tableCells);
    }

    const metaTable = createMetaTable(tableCells);

    tables = (
      <>
        <Table table={preformattedMetaTable} />
        <div className="down-arrow"></div>
        <Table table={metaTable} />
      </>
    );

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
        {tables}
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

        main {
          display: inline-flex;
          flex-direction: column;
          min-width: 600px;
        }

        .down-arrow {
          border: 20px solid;
          border-color: black transparent transparent transparent;
          height: 0;
          margin: 8px auto -12px;
          width: 0;

          > div:first-of-type {
            width: 40px;
            height: 40px;
            border-left: 1px solid black;
            border-top: 1px solid black;
            border-right: 1px solid black;
            margin: auto;
          }
        }
      `}</style>
    </div>
  );

  function randomizeFn() {
    setState({ cells, randomizedCells: randomizeTerms(cells) });
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
