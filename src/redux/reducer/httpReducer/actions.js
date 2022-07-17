import { TYPE } from './index';
import { store } from '../../store';

export const requestStart = (reqInfo, reqName) => {
  store.dispatch({
    type: TYPE(reqName).REQ_START,
    reqName,
    reqInfo,
  });
};

export const requestSuccess = (res, reqName) => {
  store.dispatch({
    type: TYPE(reqName).REQ_SUCCESS,
    data: res,
    reqName,
  });
};

export const requestFail = (error, reqName) => {
  store.dispatch({
    type: TYPE(reqName).REQ_FAIL,
    data: error,
    reqName,
  });
};

export const requestReset = reqName => {
  store.dispatch({
    type: TYPE(reqName).REQ_RESET,
    data: null,
    reqName,
  });
};

export default {
  requestStart,
  requestSuccess,
  requestFail,
  requestReset,
};
