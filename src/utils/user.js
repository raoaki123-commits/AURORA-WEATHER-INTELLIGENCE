export const loginUser = (name) => {
  localStorage.setItem("user", name);
};

export const getUser = () => {
  return localStorage.getItem("user");
};

export const logoutUser = () => {
  localStorage.removeItem("user");
};