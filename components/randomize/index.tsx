/**
 * @param props - property 'randomizeFn': function to randomize the table again.
 */
export default function Randomize(props) {
    const { randomizeFn } = props;
    return <button onClick={randomizeFn}>Randomize again</button>;
}