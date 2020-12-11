/* eslint-disable import/prefer-default-export */
import axiosI from '../axiosApi';

export const getInsuranceDAta = () => {
  return axiosI({
    method: 'get',
    url: `${process.env.PUBLIC_URL}/api/v1/insurance/insurance-data/`,
  });
};
