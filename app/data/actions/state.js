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

export const setError = (status, {error, message}) => {
  return {
    type: "setError",
    status: status,
    error: error,
    message: message,
  };
};

export const clearError = () => {
  return {
    type: "clearError",
  };
};