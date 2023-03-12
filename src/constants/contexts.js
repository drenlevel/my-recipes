// Libraries
import { createContext } from 'react';

export const Auth = createContext({ currentUser: null });
export const Data = createContext({
  recipeTypes: [],
  cuisines: [],
  ingredients: [],
});
