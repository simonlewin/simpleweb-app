import { initial } from "./initial";

const setToken = (state, { data }) => {
  return {
    ...state,
    token_type: data.token_type,
    expires_in: data.expires_in,
    access_token: data.access_token,
    refresh_token: data.refresh_token
  };
};

const addName = (state, { data }) => {
  return {
    ...state,
    name: data.name,
  };
};

const removeUser = state => {
  return {
    ...state,
    token_type: '',
    expires_in: null,
    access_token: '',
    refresh_token: '',
    name: '',
    error: {
      status: '',
      error: '',
      message: '',
    },
  };
};

const setError = (state, { status, error, message  }) => {
  return {
    ...state,
    error: {
      status: status,
      error: error,
      message: message,
    },
  };
};

const clearError = state => {
  return {
    ...state,
    error: {
      status: '',
      error: '',
      message: '',
    },
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setToken': return setToken(state, action);
    case 'addName': return addName(state, action);
    case 'removeUser': return removeUser(state, action);
    case 'setError': return setError(state, action);
    case 'clearError': return clearError(state, action);
    default: return state;
  }  
};

export default reducer;
