import React, { useState, useEffect, createContext, useContext } from "react";
import { useHistory } from "react-router";
import { login } from "../utils/api";
import usePersistedState from "./usePersistedState";

const authContext = createContext();

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => useContext(authContext);

const useProvideAuth = () => {
  const [user, setUser] = usePersistedState("user", null);

  const wrappedLogin = async (username, password) => {
    const res = await login({ username, password });
    setUser(res?.data.success ? res.data.result : false);

    return res;
  };

  const logout = async () => setUser(false);

  return { user, login: wrappedLogin, logout };
};
