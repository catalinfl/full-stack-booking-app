import React from 'react'
import { useEffect } from 'react';
import { createContext, useReducer} from 'react'

const INITIAL_STATE = {
    username: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null
}

export const RegisterContext = createContext(INITIAL_STATE);

const RegisterReducer = (state, action) => {
    switch (action.type) {
        case "REGISTER_START":
            return {
                username: null,
                email: null,
                password: null,
                loading: true,
                error: null
            }
        case "REGISTER_SUCCESS":
            return {
                username: action.payload,
                email: action.payload,
                password: action.payload,
                loading: false,
                error: null
            }
        case "REGISTER_FAILED":
            return {
                username: null,
                email: null,
                password: null,
                loading: false,
                error: action.payload
            }
        default: 
                return state;
        
    }
}

export const RegisterContextProvider = ({children}) => {
        const [state, registerDispatch] = useReducer(RegisterReducer, INITIAL_STATE);

        useEffect(() => {
            localStorage.setItem("user", JSON.stringify(state.username))
        }, [])

        return (
            <RegisterContext.Provider
            value={{
                username: state.username,
                email: state.email,
                password: state.password,
                loading: state.loading,
                error: state.error,
                registerDispatch
            }}
            >
                {children}
            </RegisterContext.Provider> 
        )
} 
