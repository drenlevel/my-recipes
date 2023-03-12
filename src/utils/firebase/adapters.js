export const getRecipes = ({ cuisines, recipeTypes } = {}, data) => {
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
