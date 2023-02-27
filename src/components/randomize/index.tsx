export interface RandomizeProps {
  randomizeFn: () => void;
}

export default function Randomize({
  randomizeFn,
}: RandomizeProps): JSX.Element {
  return <button onClick={randomizeFn}>Randomize again</button>;
}
