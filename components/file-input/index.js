import getTerms from '../../utils/get-terms.function';
import readFile from '../../utils/read-file.function';
import randomizeTerms from '../../utils/randomize-terms.function';

/**
 * @param props - property 'callback': Unary function. Sole argument is the state change to propagate to the parent component.
 */
export default function FileInput(props) {
    const { callback } = props;
    function onInputChange(file) {
        readFile(file)
            .then(fileContent => {
                const terms = getTerms(fileContent);
                const cells = randomizeTerms(terms);

                return { cells };
            })
            .catch(error => {
                return { errorMessages: [error.message] };
            })
            .then(state => {
                callback?.(state);
            });
    }

    return <input type="file" accept=".txt" onChange={event => onInputChange(event.target.files[0])} />;
}