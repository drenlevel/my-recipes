export const getIngredients = (data = {}) => {
  return Object.entries(data).reduce((acc, [category, list]) => {
    const newList = list.map(item => ({ ...item, category }));

    acc.push(...newList.sort((a, b) => a.label.localeCompare(b.label)));

    return acc;
  }, []);
};

export const getRecipes = (
  { cuisines, ingredients, recipeTypes } = {},
  data,
) => {
  const getCuisines = ({ cuisines: cuisineRefs = [] } = {}) =>
    cuisineRefs.map(({ path }) => cuisines.find(x => x.path === path)) ?? [];
  const getType = ({ type }) =>
    recipeTypes?.find(x => x.path === type?.path) ?? {};
  const getIngredients = ({ ingredients: ingredientsList = [] }) =>
    ingredientsList.map(({ ref, value }) => ({
      ...ingredients.find(ingredient => ingredient.path === ref.path),
      value,
    }));

  return data.map(item => ({
    ...item,
    cuisines: getCuisines(item),
    type: getType(item),
    ingredients: getIngredients(item),
  }));
};
