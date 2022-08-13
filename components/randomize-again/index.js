/**
 * @param props - property 'randomizeAgainFn': function to randomize the table again.
 */
export default function RandomizeAgain(props) {
    const { randomizeAgainFn } = props;
    return <button onClick={randomizeAgainFn}>Randomize again</button>;
}