/* eslint-disable import/prefer-default-export */
import axiosI from '../axiosApi';
// eslint-disable-next-line import/no-useless-path-segments
import * as actions from '../actions/index.actions';
import {
  getOutreachChoropleth,
  getOutreachData,
} from '../api/outreach';

function getSecondaryData(token) {
  return axiosI({
    method: 'get',
    url: `/api/v1/process-product/secondary-data/`,
  });
}
const setSecondaryData = data => {
  return {
    type: 'GET_OUTREACH_SECONDARY_DATA',
    payload: { data },
  };
};

export const setOutreachProvince = data => {
  return {
    type: 'GET_OUTREACH_BY_PROVINCE',
    payload: data,
  };
};

export const setOutreachDistrict = data => {
  return {
    type: 'GET_OUTREACH_BY_DISTRICT',
    payload: data,
  };
};

export const setOutreachMuniciplaity = data => {
  return {
    type: 'GET_OUTREACH_BY_MUNICIPALITY',
    payload: data,
  };
};

export const fetchOutreachSecondaryData = () => {
  return dispatch => {
    getSecondaryData()
      .then(res => {
        dispatch(setSecondaryData(res.data));
      })
      .catch(err => {});
  };
};

export const fetchOutreachChoropleth = () => {
  return dispatch => {
    getOutreachChoropleth('province', 0)
      .then(res => {
        dispatch(setOutreachProvince(res.data));
      })
      .catch(err => {
        console.log('error occured');
      });
    getOutreachChoropleth('district', 0)
      .then(res => {
        dispatch(setOutreachDistrict(res.data));
      })
      .catch(err => {
        console.log('error occured');
      });
    getOutreachChoropleth('municipality', 0)
      .then(res => {
        dispatch(setOutreachMuniciplaity(res.data));
      })
      .catch(err => {
        console.log('error occured');
      });
  };
};

export const fetchOutreachPrimaryData = () => {
  return dispatch => {
    getOutreachData()
      .then(res => {
        dispatch({
          type: 'GET_OUTREACH_BY_PRIMARY_DATA',
          payload: res.data,
        });
      })
      .catch(err => {});
  };
};
