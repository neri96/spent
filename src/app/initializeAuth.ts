import { store } from "./store";

import { setCredentials } from "@features/auth/authSlice";

const initializeAuth = () => {
  const userData = localStorage.getItem("userData");

  if (userData) {
    const { userId, accessToken } = JSON.parse(userData);

    store.dispatch(setCredentials({ userId, accessToken }));
  }
};

export default initializeAuth;
