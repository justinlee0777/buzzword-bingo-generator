import './index.scss';

import * as React from 'react';

interface RegexFormatterProps {
  initialValue: string;
}

/**
 * @param props
 * TODO: Disabling the input for now and setting it with a preset value. Need to get a better understanding of how to do
 * event listeners in React.
 */
export default function RegexFormatter({
  initialValue,
}: RegexFormatterProps): JSX.Element {
  return (
    <div className="regex-formatter">
      <div className="input-container">
        <input disabled value={initialValue} />
        <span>/</span>
        <span>/</span>
      </div>
    </div>
  );
}
