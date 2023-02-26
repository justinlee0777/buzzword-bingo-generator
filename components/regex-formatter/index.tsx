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
      <style jsx>{`
        .regex-formatter {
          display: flex;
        }

        .regex-formatter .input-container {
          position: relative;
        }

        .regex-formatter .input-container input {
          padding: 0 16px;
        }

        .regex-formatter .input-container span {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }

        .regex-formatter .input-container span:first-of-type {
          left: 8px;
        }

        .regex-formatter .input-container span:nth-of-type(2) {
          right: 8px;
        }
      `}</style>
    </div>
  );
}
