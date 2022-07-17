import CONFIG from './httpConfig';
import { httpGet } from './axiosConfig';

const { path } = CONFIG.apiUrl;

const randomUser = httpGet(path.users);

const API = {
  randomUser,
};

export default { ...API };
