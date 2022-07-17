import API from '../../services/index';
import { handleAsync } from '../../utils/function';

export const callGetRandomUser = async (param = '') => {
  const [randomUser, errRandomUser] = await handleAsync(
    API.randomUser({
      requestName: 'randomUser',
      saveToRedux: true,
      newPath: param,
    })
  );
  if (errRandomUser) throw errRandomUser;
  if (randomUser) return randomUser && randomUser.data;
};
