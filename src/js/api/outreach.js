/* eslint-disable import/prefer-default-export */
import axiosI from '../axiosApi';

// console.log(process.env.PUBLIC_URL, 'baseurl');
export const getOutreachChoropleth = (administrativeType, id) => {
  return axiosI({
    method: 'get',
    url: `${process.env.PUBLIC_URL}/api/v1/outreach/outreach-map/?${administrativeType}_id=${id}`,
  });
};

export const getOutreachData = (administrativeType, id) => {
  return axiosI({
    method: 'get',
    url: `${process.env.PUBLIC_URL}/api/v1/outreach/outreach-data/`,
  });
};
