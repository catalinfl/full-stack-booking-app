import React from 'react'
import { createContext } from 'react';
import { useReducer } from 'react'

const INITIAL_STATE = {
    name: null,
    city: null,
    address: null,
    desc: null,
    title: null,
    cheapestPrice: null,
    distance: null,
    type: null,
    loading: null,
    error: null
};

export const CreateHotelContext = createContext(INITIAL_STATE);

const HotelReducer = (state, action) => {
    switch(action.type) {
        case "HOTEL_ACCESSED":
            return {
                name: null,
                city: null,
                address: null,
                desc: null,
                title: null,
                cheapestPrice: null,
                distance: null,
                type: null,            
                loading: true,
                error: null
            }
        case "HOTEL_COMPLETED_SUCCESS":
            return {
                name: action.payload.name,
                city: action.payload.city,
                address: action.payload.address,
                desc: action.payload.desc,
                title: action.payload.title,
                cheapestPrice: action.payload.cheapestPrice,
                distance: action.payload.distance,
                type: action.payload.type,            
                loading: false,
                error: null
            }
        case "HOTEL_COMPLETED_FAILED":
            return {
                name: null,
                city: null,
                address: null,
                desc: null,
                title: null,
                cheapestPrice: null,
                distance: null,
                type: null,            
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}

export const CreateHotelContextProvider = ({children}) => {
    const [state, createHotelDispatch] = useReducer(HotelReducer, INITIAL_STATE)

    return (
        <CreateHotelContext.Provider value={{
            name: state.name,
            city: state.city,
            address: state.address,
            desc: state.desc,
            title: state.title,
            cheapestPrice: state.cheapestPrice,
            distance: state.distance,
            type: state.type,        
            loading: state.loading,
            error: state.error,
            createHotelDispatch
        }}>
            {children}
        </CreateHotelContext.Provider>
    )


}




export default CreateHotelContext