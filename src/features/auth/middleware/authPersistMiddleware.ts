import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

import { setCredentials, logout } from "@features/auth/authSlice";

const authPersistMiddleware: Middleware<{}, RootState> =
  (_store) => (next) => (action) => {
    if (setCredentials.match(action)) {
      const { userId, accessToken } = action.payload;

      localStorage.setItem("userData", JSON.stringify({ userId, accessToken }));
    } else if (logout.match(action)) {
      localStorage.removeItem("userData");
    }

    return next(action);
  };

export default authPersistMiddleware;
