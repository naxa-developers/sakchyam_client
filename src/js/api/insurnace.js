/* eslint-disable import/prefer-default-export */
import axiosI from '../axiosApi';

export const getInsuranceDAta = () => {
  return axiosI({
    method: 'get',
    url: `https://sakchyam.naxa.com.np/api/v1/insurance/insurance-data/`,
  });
};
