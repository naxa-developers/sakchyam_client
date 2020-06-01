import React from 'react';
import districtData from '../../../../../data/district.json';

export const getCenterBboxDistrict = id => {
  let distData = [];
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
          distData.push({
            name: data.name,
            center: [data.centroid_x, data.centroid_y],
            bbox: b,
          });
        }
        return true;
      });

      // console.log(munData,'munData');
    } else if (id === data.districtid) {
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
      distData = c;
    }
    return true;
  });
  console.log(distData, 'munData');
  return distData;
};

export const testFunction = id => {};
