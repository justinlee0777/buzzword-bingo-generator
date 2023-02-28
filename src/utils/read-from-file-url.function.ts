import readFile from './read-file.function';

export default async function readFromFileURL(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();

  return readFile(blob);
}
