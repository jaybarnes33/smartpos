let accessToken = "";

export const getAccessToken = () => accessToken;

export const setAccessToken = (token: string) => {
  accessToken = token;
  //localStorage.setItem('accessToken', token)
};

export const removeAccessToken = () => {
  accessToken = "";
};
