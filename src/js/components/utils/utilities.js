export const isArrayEmpty = arr => {
  return arr.length === 0;
};

export const isEmpty = () => {};

export const sortArrayByAnyKey = (array, key) => {
  if (key) {
    array.sort(function(a, b) {
      const textA = isNaN(a[key]) ? a[key].toUpperCase() : a[key];
      const textB = isNaN(b[key]) ? b[key].toUpperCase() : b[key];
      return textA < textB ? -1 : textA > textB ? 1 : 0;
    });
  } else {
    array.sort(function(a, b) {
      return a.localeCompare(b);
    });
    // array.sort();
  }
};
