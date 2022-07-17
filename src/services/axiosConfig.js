import axios from 'axios';
import httpAction from '../redux/reducer/httpReducer/actions';
import CONFIG from './httpConfig';
import _ from 'lodash';

const httpRequest = (options = { saveToRedux: false }) => {
  if (options.saveToRedux) {
    httpAction.requestStart(
      {
        url: options.url,
        fetch: options.fetchOptions,
      },
      options.requestName
    );
  }

  return new Promise((resolve, reject) => {
    axios(options.fetchOptions)
      .then(res => {
        if (options.saveToRedux) {
          if (options.reset) {
            return httpAction.requestReset(options.requestName);
          }
          httpAction.requestSuccess(res, options.requestName);
        }
        resolve(res);
      })
      .catch(error => {
        if (options.saveToRedux) {
          httpAction.requestFail(error, options.requestName);
        }
        reject(error);
      });
  });
};

const httpHeader = header => {
  const defaultHeader = {
    'Content-Type': 'application/json',
    ...header,
  };
  return defaultHeader;
};

export const httpGet = path => async options => {
  const fullUrl = `${CONFIG.apiUrl.url}${path}${options && options.newPath}`;
  const fetchOptions = {
    method: 'GET',
    url: fullUrl,
    headers: httpHeader(options && options.headers),
  };
  return await httpRequest({
    ...options,
    fetchOptions,
  });
};

export default httpRequest;
