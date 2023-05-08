import { sentenceCase } from 'change-case';
import * as FIELDS from '../fields';

/** @type {Record<RecipeKeys, string>} */
export const RECIPE = Object.entries(FIELDS).reduce(
  (acc, [k, v]) => ({ ...acc, [k]: sentenceCase(v) }),
  {},
);
