import { Box, Typography } from '@mui/material';
import {
  collection,
  collectionGroup,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { db } from '../../../firebase';
import ResponsiveAppBar from '../../AppBar/AppBar';
import { AuthContext } from '../../AuthProvider/AuthProvider';
import { Recipe } from '../Recipe/Recipe';

export const MyRecipes = () => {
  const [recipes, setRecipes] = useState();
  const { currentUser } = useContext(AuthContext);

  const recipesRef = collectionGroup(db, 'recipes');

  const q = query(recipesRef, where('user', '==', currentUser.uid));

  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      query(recipesRef, where('user', '==', currentUser.uid)),
      async (snapShot) => {
        let list = [];
        const recipes = await getDocs(q);

        recipes.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setRecipes(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
    };
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
        {recipes?.length > 0 ? (
          recipes?.map((recipe) => <Recipe recipe={recipe} />)
        ) : (
          <Typography>No recipes found</Typography>
        )}
      </Box>
    </>
  );
};
