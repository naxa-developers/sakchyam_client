import React from 'react';
import districtData from '../../../data/district.json';

export const getCenterBboxDistrict = id => {
  let distData = [];
  districtData.map(data => {
    if (typeof id === 'object') {
      id.map(distid => {
        if (distid === data.districtid) {
          const bboxArray = data.bbox.split(',');
          //
          const a = bboxArray.map(datas => {
            return parseFloat(datas);
          });
          const b = [a[1], a[0], a[3], a[2]]; // FOR LEAFLET
          // const b = [a[0], a[1], a[2], a[3]]; // FOR MAPBOX
          distData.push({
            name: data.name,
            center: [data.centroid_x, data.centroid_y],
            bbox: b,
          });
        }
        return true;
      });

      //
    } else if (id === data.districtid) {
      const bboxArray = data.bbox.split(',');
      //
      const a = bboxArray.map(datas => {
        return parseFloat(datas);
      });
      const b = [a[1], a[0], a[3], a[2]]; // FOR LEAFLET
      // const b = [a[0], a[1], a[2], a[3]]; // FOR MAPBOX
      const c = {
        name: data.name,
        center: [data.centroid_x, data.centroid_y],
        bbox: b,
      };
      distData = c;
    }
    return true;
  });

  return distData;
};

export const testFunction = id => {};
