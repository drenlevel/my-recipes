// Libraries
import { collectionGroup } from 'firebase/firestore';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

// Helpers
import db, { auth } from '.';
import * as adapters from './adapters';
import { secureGetDocs } from './helpers';
import { getRecipesQuery } from './queries';

// Constants
import * as Contexts from '#constants/contexts';
import { onAuthStateChanged } from 'firebase/auth';

const makeCustomHook = path => () => {
  // State
  const [data, setData] = useState([]);

  // Effects
  useEffect(() => {
    secureGetDocs(collectionGroup(db, path)).then(setData);
  }, []);

  return data;
};

export const useAuthContext = useContext.bind(null, Contexts.Auth);
export const useDataContext = useContext.bind(null, Contexts.Data);

export const useCuisines = makeCustomHook('cuisines');
export const useIngredients = makeCustomHook('ingredients');
export const useRecipeTypes = makeCustomHook('recipeTypes');

/**
 * Gets `recipes` given the user ID. Optionally, you can alter the data
 * by passing an adapter function or an predefined adapter key as string.
 * @param {UserRecipesOptions} options
 * @return {Array<Recipe> | []}
 */
export const useUserRecipes = ({ user, adapter }) => {
  // State
  const { currentUser } = useAuthContext();
  const [recipes, setRecipes] = useState([]);

  // Memoized
  const { query } = useMemo(
    () => getRecipesQuery(user ?? currentUser),
    [user?.uid, currentUser?.uid],
  );

  // Callbacks
  const onRecipesResolved = useCallback(
    data => {
      const mapper = adapter instanceof Function ? adapter : adapters[adapter];

      setRecipes(mapper?.(data) ?? data);
    },
    [adapter],
  );

  // Effects
  useEffect(
    () => void secureGetDocs(query).then(onRecipesResolved),
    [onRecipesResolved, query],
  );

  return recipes;
};

export const useAuthenticateUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });
  }, []);

  return { currentUser, loading };
};
