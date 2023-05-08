/**
 * @typedef {('ID' | 'TITLE' | 'DESCRIPTION' | 'IMAGE' | 'CUISINES' | 'TYPE' | 'COOKING_TIME' | 'INGREDIENTS' | 'INSTRUCTIONS' | 'SERVINGS')} RecipeKeys
 * @typedef {('id' | 'title' | 'description' | 'image' | 'cuisines' | 'type' | 'cookingTime' | 'ingredients' | 'instructions' | 'servings')} RecipeKeysCamelCase
 * @typedef {Record<RecipeKeysCamelCase, String>} GetAllReturnVal
 *
 * @typedef {Object} UserRecipesOptions
 * @property {{uid: string}} user User object with `uid` as string.
 * @property {("getRecipes" | Function)=} adapter One of `adapters/` or a custom
 * tailored adapter function.
 *
 * @typedef {{id: string, path?: string, label: string}} BaseItemObject
 * @typedef {{title: string, description: string, cuisines: BaseItemObject[], type: BaseItemObject}} Recipe
 *
 * @typedef {{current: HTMLElement?}} HTMLElementRef
 *
 * @typedef {{id: number, label: string}[]} CuisineList
 * @typedef {{id: number, label: string}[]} RecipeTypeList
 * @typedef {{id: number, label: string, unit: string}} Ingredient
 * @typedef {{pasta: Ingredient[], vegetables: Ingredient[]}} IngredientCollection
 */
