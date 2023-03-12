// Libraries
import { camelCase, constantCase } from 'change-case';

// Constants
import * as TRANSLATIONS from '#constants/translations';

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

const getReducer =
  (shouldInclude = true, ...keyArgs) =>
  (acc, key) => {
    const keyIsIncluded = keyArgs.includes(key);
    const shouldSkip = shouldInclude ? !keyIsIncluded : keyIsIncluded;

    if (shouldSkip) return acc;

    return { ...acc, [camelCase(key)]: recipe(key) };
  };

/**
 * Recursively call {@link recipe} to translate all keys.
 * @returns {GetAllReturnVal} An object of camel-cased keys and their translations.
 */
recipe.getAll = () =>
  Object.keys(TRANSLATIONS.RECIPE).reduce(getReducer(false), {});

/**
 * Recursively call {@link recipe} to translate all keys with inclusion key(s).
 * @param {...RecipeKeys} inclusionArgs One of {@link RecipeKeys}.
 * @returns {Partial<GetAllReturnVal>} An object of camel-cased keys and their translations.
 */
recipe.getSomeIncluded = (...inclusionArgs) =>
  Object.keys(TRANSLATIONS.RECIPE).reduce(
    getReducer(true, ...inclusionArgs),
    {},
  );

/**
 * Recursively call {@link recipe} to translate all keys with exclusion key(s).
 * @param {...RecipeKeys} exclusionArgs One of {@link RecipeKeys}.
 * @returns {Partial<GetAllReturnVal>} An object of camel-cased keys and their translations.
 */
recipe.getSomeExcluded = (...exclusionArgs) =>
  Object.keys(TRANSLATIONS.RECIPE).reduce(
    getReducer(false, ...exclusionArgs),
    {},
  );
