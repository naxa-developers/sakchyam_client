import React from 'react';

export const extendBounds = boundingboxArray => {
  let bbox = [];
  let count = 0;
  boundingboxArray.map(boundingbox => {
    let minX = boundingbox[0];
    let minY = boundingbox[1];
    let maxX = boundingbox[2];
    let maxY = boundingbox[3];
    if (count === 0) {
      bbox = [
        boundingbox[0],
        boundingbox[1],
        boundingbox[2],
        boundingbox[3],
      ];
      count = 1;
    }
    // // if(bbox[0] !== 0 && boundingbox[0] !== 0){
    //     console.log(boundingbox[0],'boundingbox[0]');
    //     console.log(boundingbox[1],'boundingbox[1]');
    //     console.log(boundingbox[2],'boundingbox[2]');
    //     console.log(boundingbox[3],'boundingbox[3]');
    minX = bbox[0] > boundingbox[0] ? boundingbox[0] : bbox[0];
    // }
    // if(bbox[1] !== 0 && boundingbox[1] !== 0){
    minY = bbox[1] > boundingbox[1] ? boundingbox[1] : bbox[1];

    // }
    // if(bbox[2] !== 0 && boundingbox[2] !== 0){

    maxX = bbox[2] < boundingbox[2] ? boundingbox[2] : bbox[2];
    // }
    // if(bbox[3] !== 0 && boundingbox[3] !== 0){
    maxY = bbox[3] < boundingbox[3] ? boundingbox[3] : bbox[3];
    // }
    //   console.log(bbox[0],'bbox[0]');
    //     console.log(bbox[1],'bbox[1]');
    //     console.log(bbox[2],'bbox[2]');
    //     console.log(bbox[3],'bbox[3]');
    if (minX !== 0 && minY !== 0 && maxX !== 0 && maxY !== 0) {
      // console.log('Inside Setstate')
      bbox = [minX, minY, maxX, maxY];
    }
    return true;
  });
  console.log(bbox, 'bbox');
  const returnedBbox = [
    [bbox[0], bbox[1]],
    [bbox[2], bbox[3]],
  ];
  console.log(returnedBbox, 'returnedValue');
  return returnedBbox;
};

export const a = () => {};
