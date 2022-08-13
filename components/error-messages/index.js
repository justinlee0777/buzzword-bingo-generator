/**
 * @param props - property 'messages': Array<string>. Error messages to render.
 */
export default function ErrorMessages(props) {
    const { messages } = props;
    return (
        <span className="error-message">
            {messages.join('\n')}
            <style jsx>{`
                .error-message {
                    color: red;
                }
            `}</style>
        </span>
    );
}