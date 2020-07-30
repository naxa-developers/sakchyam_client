/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-array-constructor */
// eslint-disable-next-line import/prefer-default-export
export const removeDuplicates = (array, keyValue) => {
  const obj = {};
  for (let i = 0, len = array.length; i < len; i++) {
    // eslint-disable-next-line dot-notation
    obj[array[i][keyValue]] = array[i];
  }
  const newArray = new Array();
  for (const key in obj) {
    newArray.push(obj[key]);
  }
  return newArray;
};
