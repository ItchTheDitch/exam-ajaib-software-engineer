export const handleAsync = promise => {
  return promise
    .then(data => [data, undefined])
    .catch(error => Promise.resolve([undefined, error]));
};

export default {
  handleAsync,
};
