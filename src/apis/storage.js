const storeToken = (token) => {
  localStorage.setItem("token", token);
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export { storeToken, removeToken, getToken };
