export const toArray = (_arr, filterNullish = false) => {
  const arr = Array.isArray(_arr) ? _arr : [_arr];

  return filterNullish ? arr.filter(Boolean) : arr;
};

/**
 * Converts a given file to dataURI string.
 * @param {File} file File to convert to dataURI string. _Mandatory_
 * @returns {Promise<string>} Awaited resolved dataURI string.
 */
export const fileToDataUrl = file =>
  new Promise(resolve => {
    const reader = new FileReader();

    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });

export const dataUrlToFile = (dataUrl, fileName) => {
  const [metadata, uriStr] = dataUrl.split(';base64,');
  const arrayBuffer = new ArrayBuffer(window.atob(uriStr).length);

  return new File([arrayBuffer], fileName, { type: metadata.split(':')[1] });
};
