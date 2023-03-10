export const toArray = (_arr, filterNullish = false) => {
  const arr = Array.isArray(_arr) ? _arr : [_arr];

  return filterNullish ? arr.filter(Boolean) : arr;
};
