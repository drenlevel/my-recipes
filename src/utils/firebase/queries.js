// Libraries
import { collection, query } from 'firebase/firestore';

// Helpers
import db from '.';
import { byOwnerId } from './conditions';

export const getRecipesQuery = id => {
  const ref = collection(db, 'recipes');
  const condition = byOwnerId(id);
  const q = query(ref, condition);

  return { ref, query: q, condition };
};
