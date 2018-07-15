export const setToken = data => {
  console.log('state.js setToken ', data)
  return {
    type: "setToken",
    data: data,
  };
};

export const addUser = data => {
  console.log('state.js addUser ', data)
  return {
    type: "addUser",
    data: data,
  };
};