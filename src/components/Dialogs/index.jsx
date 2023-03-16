// Libraries
import { useEffect, useRef } from 'react';

// Components
import { AddRecipeModal } from '#components/Recipes/Recipe/Add';
import { DeleteRecipeModal } from '#components/Recipes/Recipe/Delete';
import { ViewRecipeModal } from '#components/Recipes/Recipe/View';

export const dialogs = (() => {
  const NOOP = () => Promise.resolve();
  const defaultMethods = { show: NOOP, hide: NOOP, toggleShown: NOOP };

  return {
    recipe: {
      add: defaultMethods,
      delete: defaultMethods,
      edit: defaultMethods,
      view: defaultMethods,
    },
  };
})();

export default function Dialogs() {
  const addRecipeRef = useRef({});
  const deleteRecipeRef = useRef({});
  const viewRecipeRef = useRef({});

  // Effect
  useEffect(() => {
    dialogs.recipe.add = addRecipeRef.current;
    dialogs.recipe.delete = deleteRecipeRef.current;
    dialogs.recipe.edit = addRecipeRef.current;
    dialogs.recipe.view = viewRecipeRef.current;
  }, []);

  return (
    <>
      <AddRecipeModal ref={addRecipeRef} />
      <DeleteRecipeModal ref={deleteRecipeRef} />
      <ViewRecipeModal ref={viewRecipeRef} />
    </>
  );
}
