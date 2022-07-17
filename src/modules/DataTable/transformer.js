import _ from 'lodash';

export const mappingRandomUserData = userData => {
  let result = {};
  const data = [];
  userData &&
    userData.map(item => {
      const id = _.get(item, 'id.value', '');
      const userName = _.get(item, 'name.first', '');
      const name = `${_.get(item, 'name.first', '')} ${_.get(
        item,
        'name.last',
        ''
      )}`;
      const email = _.get(item, 'email', '');
      const gender = _.get(item, 'gender', '');
      const register_date = _.get(item, 'registered.date', '');
      data.push({
        id,
        userName,
        name,
        email,
        gender,
        register_date,
      });
    });
  result = {
    data,
  };
  return result;
};
