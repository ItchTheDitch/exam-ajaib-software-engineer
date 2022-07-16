export const TYPE = name => {
  return {
    REQ_START: `REQ_START_${name && name.toUpperCase()}`,
    REQ_SUCCESS: `REQ_SUCCESS_${name && name.toUpperCase()}`,
    REQ_FAIL: `REQ_FAIL_${name && name.toUpperCase()}`,
    REQ_RESET: `RESET_${name && name.toUpperCase()}`,
  };
};

export default function reducer(state = {}, action) {
  switch (action.type) {
    case TYPE(action.reqName).REQ_START:
      return {
        ...state,
        [action.reqName]: {
          ...state[action.reqName],
          reqInfo: action.reqInfo,
          reqLoading: true,
        },
      };
    case TYPE(action.reqName).REQ_SUCCESS:
      return {
        ...state,
        [action.reqName]: {
          ...state[action.reqName],
          response: action.data,
          isError: false,
          reqLoading: false,
        },
      };
    case TYPE(action.reqName).REQ_FAIL:
      return {
        ...state,
        [action.reqName]: {
          ...state[action.reqName],
          error: action.data,
          isError: true,
          reqLoading: false,
        },
      };
    case TYPE(action.reqName).REQ_RESET:
      return {
        reset: true,
      };
    default:
      return state;
  }
}
