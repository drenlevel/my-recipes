// Libraries
import * as yup from 'yup';

// Helpers
import * as translate from '#utils/translate';

const requiredFields = translate.recipe.getAll('ID', 'SERVINGS', 'CUISINES');
const fieldEntries = Object.entries(requiredFields);
const makeRequiredString = x => yup.string().required(`${x} is required!`);
const reducer = (acc, [k, v]) => ({ ...acc, [k]: makeRequiredString(v) });

export const AddSchema = yup.object(fieldEntries.reduce(reducer, {}));
