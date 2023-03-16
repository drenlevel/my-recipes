// Helpers
import { useCuisines, useIngredients, useRecipeTypes } from '#utils/hooks';

// Constants
import { Data } from '#constants/contexts';

export const DataProvider = ({ children }) => {
  const cuisines = useCuisines();
  const recipeTypes = useRecipeTypes();
  const ingredients = useIngredients();

  return (
    <Data.Provider value={{ cuisines, recipeTypes, ingredients }}>
      {children}
    </Data.Provider>
  );
};
