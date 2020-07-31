/* eslint-disable import/prefer-default-export */
import axiosI from '../axiosApi';

export const getOutreachChoropleth = (administrativeType, id) => {
  return axiosI({
    method: 'get',
    url: `https://sakchyam.naxa.com.np/api/v1/outreach/outreach-map/?${administrativeType}_id=${id}`,
  });
};

export const getOutreachData = (administrativeType, id) => {
  return axiosI({
    method: 'get',
    url: `https://sakchyam.naxa.com.np/api/v1/outreach/outreach-data/`,
  });
};
