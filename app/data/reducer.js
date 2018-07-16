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
    access_token: '',
    name: '',
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setToken': return setToken(state, action);
    case 'addName': return addName(state, action);
    case 'removeUser': return removeUser(state, action);
    default: return state;
  }  
};

export default reducer;
