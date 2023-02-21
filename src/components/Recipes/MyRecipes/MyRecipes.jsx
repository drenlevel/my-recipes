import { Box, Typography } from '@mui/material';
import {
  collectionGroup,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '#utils/firebase';
import ResponsiveAppBar from '#components/AppBar/AppBar';
import { AuthContext } from '#components/AuthProvider/AuthProvider';
import { Recipe } from '#components/Recipes/Recipe/Recipe';

export const MyRecipes = () => {
  const [recipes, setRecipes] = useState();
  const { currentUser } = useContext(AuthContext);

  const recipesRef = collectionGroup(db, 'recipes');

  const q = query(recipesRef, where('user', '==', currentUser.uid));

  useEffect(() => {
    // LISTEN (REALTIME)
    return onSnapshot(
      query(recipesRef, where('user', '==', currentUser.uid)),
      () => {
        getDocs(q).then(res => {
          const recipes = res.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          setRecipes(recipes);
        });
      },
      console.log,
    );
  }, []);

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
        {!!recipes?.length &&
          recipes?.map((recipe, i) => (
            <Recipe key={`recipe-${i + 1}`} recipe={recipe} />
          ))}
        {!recipes?.length && <Typography>No recipes found</Typography>}
      </Box>
    </>
  );
};
