// Libraries
import { useCallback } from 'react';

// Components
import ResponsiveAppBar from '#components/AppBar/AppBar';
import { Recipe } from '#components/Recipes/Recipe/Recipe';
import { Box, Typography } from '@mui/material';

// Helpers
import * as adapters from '#utils/firebase/adapters';
import { useDataContext, useUserRecipes } from '#utils/firebase/hooks';

export const MyRecipes = () => {
  const { cuisines, recipeTypes } = useDataContext();
  const adapter = useCallback(
    data => adapters.getRecipes({ cuisines, recipeTypes }, data),
    [cuisines, recipeTypes],
  );
  const recipes = useUserRecipes({ adapter });

  return (
    <>
      <ResponsiveAppBar />
      <Box
        display="grid"
        gridTemplateColumns="1fr 1fr 1fr"
        gap={3}
        mx={2}
        my={2}
      >
        {recipes?.map((recipe, i) => (
          <Recipe key={`recipe-${i + 1}`} recipe={recipe} />
        ))}
        {!recipes?.length && <Typography>No recipes found</Typography>}
      </Box>
    </>
  );
};
