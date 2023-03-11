// Libraries
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Helpers
import * as translate from '#utils/translate';

const requiredFields = translate.recipe.getSomeExcluded(
  'ID',
  'SERVINGS',
  'CUISINES',
);
const fieldEntries = Object.entries(requiredFields);
const makeRequiredString = x => yup.string().required(`${x} is required!`);
const reducer = (acc, [k, v]) => ({ ...acc, [k]: makeRequiredString(v) });

export const AddSchema = {
  resolver: yupResolver(yup.object(fieldEntries.reduce(reducer, {}))),
};
