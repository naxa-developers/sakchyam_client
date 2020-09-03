/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-array-constructor */
// eslint-disable-next-line import/prefer-default-export
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';

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

export const getDuplicateObjectCount = array => {
  const arr2 = [];

  function getCount(arr, num) {
    const count = arr.filter(item => item === num);
    return count.length;
  }

  array.forEach(item => {
    const obj = arr2.map(x => x.code === item).includes(true);
    if (!obj)
      arr2.push({
        code: item,
        count: getCount(array, item),
      });
  });

  return arr2;
};

export const getShortNumbers = labelValue => {
  // Nine Zeroes for Billions
  return Math.abs(Number(labelValue)) >= 1.0e9
    ? `${(Math.abs(Number(labelValue)) / 1.0e9).toFixed(2)}B`
    : // Six Zeroes for Millions
    Math.abs(Number(labelValue)) >= 1.0e6
    ? `${(Math.abs(Number(labelValue)) / 1.0e6).toFixed(2)}M`
    : // Three Zeroes for Thousands
    Math.abs(Number(labelValue)) >= 1.0e3
    ? `${(Math.abs(Number(labelValue)) / 1.0e3).toFixed(2)}K`
    : Math.abs(Number(labelValue));
};

export const aggregateCounts = array => {
  const arrayNew = [];

  array.forEach(partner => {
    let count = 0;
    array.forEach(parts => {
      if (partner.partner === parts.partner) {
        count += parts.tablets;
      }
    });
    arrayNew.push({ partner: partner.partner, count });
  });

  return arrayNew;
};

export const downloadPng = (chartid, filename) => {
  console.log('called');
  setTimeout(() => {
    html2canvas(document.querySelector(`#${chartid}`), {}).then(
      canvas => {
        canvas.toBlob(function(blob) {
          saveAs(blob, `${filename}.png`);
        });
      },
    );
  }, 10);
};
