import React from 'react'
import { createContext, useReducer, useEffect} from 'react'

const INITIAL_STATE = {
    user: null,
    loading: false,
    error: null
}

export const RegisterContext = createContext(INITIAL_STATE);

const RegisterReducer = (state, action) => {
    switch (action.type) {
        case: "LOGIN_START":
            return {
                
            }
    }
}