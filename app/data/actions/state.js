export const setToken = data => {
  return {
    type: "setToken",
    data: data,
  };
};

export const addName = data => {
  return {
    type: "addName",
    data: data,
  };
};

export const removeUser = () => {
  return {
    type: "removeUser",
  };
};
