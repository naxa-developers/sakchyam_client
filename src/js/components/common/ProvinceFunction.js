import React from 'react';
import provinceData from '../../../data/province.json';

export const getCenterBboxProvince = id => {
  let munData = [];
  provinceData.map(data => {
    if (typeof id === 'object') {
      id.map(provid => {
        if (provid === data.FIRST_PROV) {
          const bboxArray = data.BBOX.split(',');
          //
          const a = bboxArray.map(datas => {
            return parseFloat(datas);
          });
          const b = [a[1], a[0], a[3], a[2]]; // FOR LEAFLET
          // const b = [a[0], a[1], a[2], a[3]]; // FOR MAPBOX
          munData.push({
            name: data.FIRST_PROV,
            center: [data.Centroid_X, data.Centroid_Y],
            bbox: b,
          });
        }
        return true;
      });

      //
    } else if (id === data.FIRST_PROV) {
      const bboxArray = data.BBOX.split(',');
      //
      const a = bboxArray.map(datas => {
        return parseFloat(datas);
      });
      const b = [a[1], a[0], a[3], a[2]]; // FOR LEAFLET
      // const b = [a[0], a[1], a[2], a[3]]; // FOR MAPBOX
      const c = {
        name: data.FIRST_PROV,
        center: [data.Centroid_X, data.Centroid_Y],
        bbox: b,
      };
      munData = c;
    }
    return true;
  });
  //
  return munData;
};

export const testFunction = id => {};
