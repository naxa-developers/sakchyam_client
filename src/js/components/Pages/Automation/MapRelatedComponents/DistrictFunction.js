import React from 'react';
import districtData from '../../../../../data/district.json';

export const getCenterBboxDistrict = id => {
  let munData = [];
  districtData.map(data => {
    if (typeof id === 'object') {
      id.map(distid => {
        if (distid === data.districtid) {
          const bboxArray = data.bbox.split(',');
          // console.log(bboxArray,'bboxaray')
          const a = bboxArray.map(datas => {
            return parseFloat(datas);
          });
          const b = [a[1], a[0], a[3], a[2]];
          munData.push({
            name: data.name,
            center: [data.centroid_x, data.centroid_y],
            bbox: b,
          });
        }
        return true;
      });
      return true;
      // console.log(munData,'munData');
    }
    if (id === data.districtid) {
      const bboxArray = data.bbox.split(',');
      // console.log(bboxArray,'bboxaray')
      const a = bboxArray.map(datas => {
        return parseFloat(datas);
      });
      const b = [a[1], a[0], a[3], a[2]];
      const c = {
        name: data.name,
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
