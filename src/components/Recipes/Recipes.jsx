import { Box } from '@mui/material';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '#utils/firebase';
import { Recipe } from './Recipe/Recipe';

export const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // LISTEN (REALTIME)
    return onSnapshot(
      collection(db, 'recipes'),
      snapShot => {
        let list = [];
        snapShot.docs.forEach(doc => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setRecipes(list);
      },
      console.log,
    );
  }, []);

  return (
    <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={3} mx={2} my={2}>
      {recipes.map((recipe, i) => (
        <Recipe key={`recipe-${i + 1}`} recipe={recipe} />
      ))}
    </Box>
  );
};
