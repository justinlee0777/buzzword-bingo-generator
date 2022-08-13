/**
 * Implementing Knuth shuffle @see @url https://en.wikipedia.org/wiki/Fisher–Yates_shuffle
 * @params terms - Array<string>. Cells to randomize.
 */
export default function randomizeTerms(terms) {
    const randomizedTerms = [...terms];

    const length = randomizedTerms.length;
    const endIndex = length - 1;

    for (let i = 0; i < endIndex; i++) {
        const index = Math.floor(
            Math.random() * (length - i) + i
        );

        const cache = randomizedTerms[i];
        randomizedTerms[i] = randomizedTerms[index];
        randomizedTerms[index] = cache;
    }

    return randomizedTerms;
}