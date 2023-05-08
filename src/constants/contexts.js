// Libraries
import { createContext } from 'react';

export const Auth = createContext({ currentUser: null });

export const Data = createContext({
  /** @type {CuisineList} */
  cuisines: [],
  /** @type {IngredientCollection} */
  ingredients: [],
  /** @type {RecipeTypeList} */
  recipeTypes: [],
});
