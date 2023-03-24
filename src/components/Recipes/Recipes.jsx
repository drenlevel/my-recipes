// Libraries
import { useCallback, useEffect, useState } from 'react';

// Components
import { AddNewRecipeButton, Recipe } from '#components/Recipes/Recipe/Recipe';
import Box from '@mui/material/Box';

// Helpers
import { dialogs } from '#components/Dialogs';
import * as adapters from '#utils/firebase/adapters';
import {
  useDataContext,
  useGetRecipeFromSearch,
  useUserRecipes,
} from '#utils/hooks';

// Stylesheets(s)
import './styles.css';

const RecipesData = () => {
  const { cuisines, ingredients, recipeTypes } = useDataContext();
  const [hasDependencies, setHasDependencies] = useState(false);
  const adapter = useCallback(
    data => adapters.getRecipes({ cuisines, ingredients, recipeTypes }, data),
    [cuisines, ingredients, recipeTypes],
  );
  const recipes = useUserRecipes({ adapter, delay: !hasDependencies });

  // Callbacks
  const getRecipeFromURL = useCallback(
    (recipeId, setRecipeId) => {
      if (!hasDependencies || !recipes || !recipeId) return;

      const recipe = recipes.find(({ id }) => id === recipeId);

      if (recipeId === 'new') {
        setRecipeId('');
        dialogs.recipe.add.show().then(() => setRecipeId(''));
      } else if (recipe) {
        dialogs.recipe.view.show(recipe).then(() => setRecipeId(''));
      }
    },
    [hasDependencies, recipes],
  );

  useEffect(() => {
    const checkList = [cuisines, ingredients, recipeTypes];

    setHasDependencies(!checkList.some(x => !x?.length));
  }, [cuisines, ingredients, recipeTypes]);
  useGetRecipeFromSearch(getRecipeFromURL);

  return recipes?.map((recipe, i) => (
    <Recipe key={`recipe-${i + 1}`} recipe={recipe} idx={i} />
  ));
};

export const Recipes = () => {
  return (
    <div className="container--cardBox">
      <Box className="cardBox">
        <AddNewRecipeButton />
        <RecipesData />
      </Box>
    </div>
  );
};
