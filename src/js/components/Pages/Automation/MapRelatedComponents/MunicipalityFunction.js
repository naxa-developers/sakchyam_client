import React from 'react';
import municipalityData from '../../../../../data/municipality.json';

export const getCenterBboxMunicipality = id => {
  let munData = [];
  municipalityData.map(data => {
    if (typeof id === 'object') {
      id.map(mid => {
        if (mid === data.lu_name) {
          const bboxArray = data.bbox.split(',');
          // console.log(bboxArray,'bboxaray')
          const a = bboxArray.map(datas => {
            return parseFloat(datas);
          });
          const b = [a[1], a[0], a[3], a[2]];
          munData.push({
            name: data.lu_name,
            center: [data.centroid_x, data.centroid_y],
            bbox: b,
          });
        }
        return true;
      });

      // console.log(munData,'munData');
    } else if (id === data.lu_name) {
      const bboxArray = data.bbox.split(',');
      // console.log(bboxArray,'bboxaray')
      const a = bboxArray.map(datas => {
        return parseFloat(datas);
      });
      const b = [a[1], a[0], a[3], a[2]];
      const c = {
        name: data.lu_name,
        center: [data.centroid_x, data.centroid_y],
        bbox: b,
      };
      munData = c;
    }
    return true;
  });
  // console.log(munData,'munData');
  return munData;
};

export const testFunction = id => {};
