import { Box } from '@mui/material';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { Recipe } from './Recipe/Recipe';

export const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // LISTEN (REALTIME)
    const unsub = onSnapshot(
      collection(db, 'recipes'),
      (snapShot) => {
        let list = [];
        snapShot.docs.forEach((doc) => {
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
    <Box display="grid" gridTemplateColumns="1fr 1fr 1fr" gap={3} mx={2} my={2}>
      {recipes.map((recipe) => (
        <Recipe recipe={recipe} />
      ))}
    </Box>
  );
};
