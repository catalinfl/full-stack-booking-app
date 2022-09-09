import { useState } from "react";
import { createContext, useEffect, useReducer } from "react";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        createProperty: false,
        loading: true,
        error: null,
        isLoggedIn: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        createProperty: true,
        loading: false,
        error: null,
        isLoggedIn: true,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        createProperty: false,
        loading: false,
        error: action.payload,
        isLoggedIn: null,
      };
    case "LOGOUT":
      return {
        user: null,
        createProperty: null,
        loading: false,
        error: null,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, authDispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  
  useEffect(() => {
    localStorage.setItem("createProperty", JSON.stringify(state.createProperty));
  }, [state.createProperty])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        createProperty: state.createProperty,
        loading: state.loading,
        error: state.error,
        isLoggedIn: state.isLoggedIn,
        authDispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};