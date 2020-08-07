/* eslint-disable radix */
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

export const numberWithCommas = x => {
  if (x !== null) {
    const parts = x.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
  return x;
};

export const getFormattedDate = date => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const month = date.substr(5, 2);
  const day = date.substr(8, 2);
  const year = date.substr(0, 4);

  const filteredDate = `${monthNames[parseInt(month) - 1]} ${year}`;
  return filteredDate;
};
