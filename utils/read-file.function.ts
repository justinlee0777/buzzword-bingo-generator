/**
 * @params file - Blob. Taken from HTMLInputElement::files after a change event.
 * @returns a Promise that resolves when the file's text is read.
 */
export default function readFile(file: Blob): Promise<string> {
    const fileReader = new FileReader();

    return new Promise(resolve => {
        fileReader.addEventListener('load', event => {
            resolve(event.target.result as string);
        });

        fileReader.readAsText(file);
    });
}