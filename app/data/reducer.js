const setToken = (state, { data }) => {
  return {
    ...state,
    token_type: data.token_type,
    expires_in: data.expires_in,
    access_token: data.access_token,
    refresh_token: data.refresh_token
  };
};

const addUser = (state, { data }) => {
  return {
    ...state,
    user: data.name,
  };
};

const removeUser = (state) => {
  return {
    ...state,
    access_token: '',
  };
};

// new action to set SignInRequested flag

const reducer = (state, action) => {
  switch (action.type) {
    case 'setToken': return setToken(state, action);
    case 'addUser': return addUser(state, action);
    case 'removeUser': return removeUser(state, action);
    default: return state;
  }  
};

export default reducer;
