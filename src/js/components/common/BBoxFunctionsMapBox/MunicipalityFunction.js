import React from 'react';
import municipalityData from '../../../../data/municipality.json';

export const getCenterBboxMunicipality = id => {
  let munData = [];
  // debugger;
  municipalityData.map(data => {
    if (typeof id === 'object') {
      id.map(mid => {
        if (mid === data.munid) {
          const bboxArray = data.bbox.split(',');
          // console.log(bboxArray,'bboxaray')
          const a = bboxArray.map(datas => {
            return parseFloat(datas);
          });
          // const b = [a[1], a[0], a[3], a[2]]; // FOR LEAFLET
          const b = [a[0], a[1], a[2], a[3]]; // FOR MAPBOX
          munData.push({
            name: data.munid,
            center: [data.centroid_x, data.centroid_y],
            bbox: b,
          });
        }
        return true;
      });

      // console.log(munData,'munData');
    } else if (id === data.munid) {
      const bboxArray = data.bbox.split(',');
      // console.log(bboxArray,'bboxaray')
      const a = bboxArray.map(datas => {
        return parseFloat(datas);
      });
      // const b = [a[1], a[0], a[3], a[2]]; // FOR LEAFLET
      const b = [a[0], a[1], a[2], a[3]]; // FOR MAPBOX
      const c = {
        name: data.munid,
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
