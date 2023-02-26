import './index.scss';

import * as React from 'react';

export interface ErrorMessagesProp {
  messages: Array<string>;
}

export default function ErrorMessages({
  messages,
}: ErrorMessagesProp): JSX.Element {
  return <span className="error-message">{messages.join('\n')}</span>;
}
