// Libraries
import { collection } from 'firebase/firestore';
import {
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';

// Helpers
import db, { auth } from './firebase';
import * as adapters from './firebase/adapters';
import { secureGetDocs } from './firebase/helpers';
import { getRecipesQuery } from './firebase/queries';

// Constants
import * as Contexts from '#constants/contexts';
import { onAuthStateChanged } from 'firebase/auth';

const makeCustomHook = (path, adapter) => () => {
  // State
  const [data, setData] = useState([]);
  const { uid } = useAuthContext()?.currentUser ?? {};

  // Effects
  useEffect(() => {
    if (!uid) return;

    const [mainPath, subPath] = Array.isArray(path) ? path : [path];

    secureGetDocs(collection(db, mainPath))
      .then(snapshot => {
        if (subPath) {
          return new Promise(resolve => {
            const subPathDocs = {};

            snapshot.forEach(async (doc, i, { length }) => {
              const postsRef = collection(doc.ref, subPath);
              subPathDocs[doc.id] = await secureGetDocs(postsRef);

              i === length - 1 && resolve(subPathDocs);
            });
          });
        }

        return snapshot;
      })
      .then(data => setData(adapter?.(data) ?? data));
  }, [uid]);

  return data;
};

export const useAuthContext = () => useContext(Contexts.Auth);
export const useDataContext = () => useContext(Contexts.Data);

export const useCuisines = makeCustomHook('cuisines');
export const useIngredients = makeCustomHook(
  ['ingredients', 'list'],
  adapters.getIngredients,
);
export const useRecipeTypes = makeCustomHook('recipeTypes');

/**
 * Gets `recipes` given the user ID. Optionally, you can alter the data
 * by passing an adapter function or an predefined adapter key as string.
 * @param {UserRecipesOptions} options
 * @return {Array<Recipe> | []}
 */
export const useUserRecipes = ({ user, adapter, delay = false }) => {
  // State
  const { currentUser } = useAuthContext();
  const [recipes, setRecipes] = useState([]);

  // Memoized
  const userId = useMemo(() => {
    const baniUID = 'U2rpVdyS5peat2IVygaJuqXWTUY2';
    const dreniUID = 'u3pInLBdR1YhHko2Ij4Eh5qclTz1';
    // return (baniUID || user?.uid) ?? currentUser?.uid;
    return (dreniUID || user?.uid) ?? currentUser?.uid;
  }, [user?.uid, currentUser?.uid]);
  const { query } = useMemo(() => getRecipesQuery(userId), [userId]);

  // Callbacks
  const onRecipesResolved = useCallback(
    data => {
      const mapper = adapter instanceof Function ? adapter : adapters[adapter];

      setRecipes(mapper?.(data) ?? data);
    },
    [adapter],
  );

  // Effects
  useEffect(() => {
    if (delay) return;

    void secureGetDocs(query).then(onRecipesResolved);
  }, [delay, query, onRecipesResolved]);

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

export const useDialog = (ref, { onShow, onHide, onToggle } = {}) => {
  // State
  const [shown, setShown] = useState(false);
  const dialogResolverRef = useRef(() => {});

  // Hooks
  useImperativeHandle(
    ref,
    () => ({
      shown,
      show: (...args) => {
        setShown(true);
        onShow?.(...args);

        return new Promise(resolve => {
          dialogResolverRef.current = resolve;
        });
      },
      hide: (...args) => {
        setShown(false);
        onHide?.(...args);
        dialogResolverRef?.current?.(false);

        return Promise.resolve(false);
      },
      toggleShown: (doOpen, ...args) => {
        setShown(state => doOpen ?? !state);
        onToggle?.(...args);

        return Promise.resolve();
      },
    }),
    [onHide, onShow, onToggle, shown],
  );

  return shown;
};

export const useRecipeDialog = ref => {
  const [recipe, setRecipe] = useState({});
  const shown = useDialog(ref, {
    onShow: setRecipe,
    onHide: setRecipe,
  });

  return [recipe, shown];
};

export const useMediaQuery = (() => {
  const queries = { tablet: '(min-width: 701px)' };

  /**
   * @param {('tablet')} query CSS `@media` query
   */
  return query => {
    // State
    const mediaQueryRef = useRef(window.matchMedia(queries[query] ?? query));
    const [isMatched, setIsMatched] = useState(mediaQueryRef.current.matches);

    // Effects
    useEffect(() => {
      const mediaQuery = mediaQueryRef.current;
      const checkIfMediaMatches = event => setIsMatched(event.matches);

      checkIfMediaMatches(mediaQuery);
      mediaQuery.addEventListener('change', checkIfMediaMatches);

      return () =>
        mediaQuery.removeEventListener('change', checkIfMediaMatches);
    }, [query]);

    return isMatched;
  };
})();

export const useGetRecipeFromSearch = callback => {
  // State
  const [recipeId, setRecipeId] = useState('');
  const location = useLocation();

  // Effects
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);

    setRecipeId(queryParams.get('recipe') ?? '');

    return () => setRecipeId('');
  }, [location]);

  useEffect(() => {
    recipeId && callback?.(recipeId, setRecipeId);
  }, [recipeId, callback]);
};

export const useMutableMap = ref => {
  // State
  const mapRef = useRef(new Map());
  const [, updateState] = useState();
  const forceUpdate = () => updateState({});

  // Effects
  useImperativeHandle(
    ref,
    () => ({
      get values() {
        return [...mapRef.current.values()];
      },
      get: key => mapRef.current.get(key),
      set: (key, value) => {
        mapRef.current.set(key, value);
        forceUpdate();
      },
      delete: key => {
        mapRef.current.delete(key);
        forceUpdate();
      },
      clear: () => {
        mapRef.current.clear();
        forceUpdate();
      },
    }),
    [],
  );
  useEffect(() => forceUpdate(), []);
};
