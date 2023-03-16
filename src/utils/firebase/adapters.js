export const getIngredients = (() => {
  const getCollection = (coll, path) =>
    Object.entries(coll)
      .map(([id, v]) => ({ ...v, id, path: `${path}/${id}` }))
      .sort((a, b) => a.label.localeCompare(b.label));

  return data =>
    data?.reduce((acc, { id, path, ...rest }) => {
      return { ...acc, [id]: getCollection(rest, path) };
    }, {});
})();

export const getRecipes = (
  { cuisines, ingredients, recipeTypes } = {},
  data,
) => {
  console.log(ingredients);
  const getCuisines = ({ cuisines: cuisineRefs = [] } = {}) =>
    cuisineRefs.map(({ path }) => cuisines.find(x => x.path === path)) ?? [];
  const getType = ({ type }) =>
    recipeTypes?.find(x => x.path === type?.path) ?? {};

  return data.map(item => ({
    ...item,
    cuisines: getCuisines(item),
    type: getType(item),
  }));
};
