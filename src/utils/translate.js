// Libraries
import { camelCase, constantCase } from 'change-case';

// Constants
import * as TRANSLATIONS from '#constants/translations';

/**
 * @typedef {('ID' | 'TITLE' | 'DESCRIPTION' | 'IMAGE' | 'CUISINES' | 'TYPE' | 'COOKING_TIME' | 'INGREDIENTS' | 'INSTRUCTIONS' | 'SERVINGS')} RecipeKeys
 * @typedef {('id' | 'title' | 'description' | 'image' | 'cuisines' | 'type' | 'cookingTime' | 'ingredients' | 'instructions' | 'servings')} RecipeKeysCamelCase
 * @typedef {Partial<Record<RecipeKeysCamelCase, String>>} GetAllReturnVal
 */

/**
 * Translates `recipe` properties.
 * @param {RecipeKeys=} [rawKey=''] Key from the recipe schema. _Mandatory_
 * @returns {string} Translation of the given key from {@link TRANSLATIONS.RECIPE | recipe terms}.
 */
export const recipe = (rawKey = '') => {
  const terms = TRANSLATIONS.RECIPE;
  const key = constantCase(rawKey);

  return terms[key] ?? rawKey;
};

/**
 * Recursively call {@link recipe} to translate all keys, unless an exlucion
 * is specified.
 * @param {...RecipeKeys} exclusionArgs One of {@link RecipeKeys}.
 * @returns {GetAllReturnVal} An object of camel-cased keys and their translations.
 */
recipe.getAll = (...exclusionArgs) => {
  return Object.keys(TRANSLATIONS.RECIPE).reduce((acc, key) => {
    if (exclusionArgs.includes(key)) return acc;

    return { ...acc, [camelCase(key)]: recipe(key) };
  }, {});
};
