import React, { useState, useContext } from 'react'
import './createhotel.scss'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import { CreateHotelContext } from '../../context/CreateHotelContext'
import { AuthContext } from '../../context/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'

const CreateHotel = () => {

    const { createHotelDispatch } = useContext(CreateHotelContext);

    const [hotel, setHotel] = useState({
        name: undefined,
        type: undefined,
        city: undefined,
        address: undefined,
        title: undefined,
        desc: undefined,
        cheapestPrice: undefined,
        distance: undefined,
    })

    const handleChange = (e) => {
        setHotel((prev) => ({...prev, [e.target.id]: e.target.value}))
    }

    const { user } = useContext(AuthContext);
    const handleCreateHotel = async (e) => {
        e.preventDefault();
        createHotelDispatch({type: "HOTEL_ACCESSED"});
        try {
            const res = await axios.post('/hotels', hotel);
            createHotelDispatch({ type: "HOTEL_COMPLETED_SUCCESS", payload: res.data})
        }
        catch(err) {
            createHotelDispatch({ type: "HOTEL_COMPLETED_FAILED", payload: err.response.data})
        }
    };

    const [sphereClassName, setSphereClassName] = useState("initial");


    const focusInput = (e) => {
        if (e.target.id) {
            setSphereClassName(e.target.id + "sphere");
        }
    }





  return (
    <div className="createPage">
    {user ? 
    <>
    <Navbar />
    <div className="createHotel">
        <div className="createHotelContainer">
            <span className="logInLine"> 
            </span>
            <span className={`logInSphere ${sphereClassName}`}> </span>
        <div className="createHotelInfo">
            <span className="createHotelInfoText"> Publish a hotel </span>
        </div>
        <div className="createHotelForm">
            <form className="hotelForm">
                <div className="inputItem">
                    <label> Hotel name: </label>
                    <input onChange={handleChange} onFocus={focusInput} type="text" className="createHotelName" id="name"/>
                </div>
                <div className="inputItem">
                    <label> City: </label>
                    <input onChange={handleChange} onFocus={focusInput} type="text" className="hotelCity" id="city" />
                </div>
                <div className="inputItem">
                    <label> Address: </label>
                    <input onChange={handleChange} onFocus={focusInput} type="text" className="hotelCreateAddress" id="address" />
                </div>
                <div className="inputItem">
                    <label> Title of desc: </label>
                    <input onChange={handleChange} onFocus={focusInput} type="text" className="hotelTitleDesc" id="title"/>
                </div>
                <div className="inputItem">
                    <label> Description: </label>
                    <input onChange={handleChange} onFocus={focusInput} type="text" className="hotelDescription" id="desc" />
                </div>
                <div className="inputItem">
                    <label> Lowest price </label>
                    <input onChange={handleChange} onFocus={focusInput} type="number" className="hotelCheapestPrice" id="cheapestPrice"/>
                </div>
                <div className="inputItem">
                    <label> Distance from center </label>
                    <input onChange={handleChange} onFocus={focusInput} type="number" className="hotelCheapestPrice" id="distance" />
                </div>
                <div className="inputItem">
                    <label> Hotel type: </label>
                    <select onChange={handleChange}  onFocus={focusInput} id="type">
                        <option value="hotel"> Hotel </option>
                        <option value="apartment"> Apartment </option>
                        <option value="villa"> Villa </option>
                        <option value="resorts"> Resorts </option>
                        <option value="cabins"> Cabins </option>
                    </select>
                </div>
                    <button className="createHotelButton" onClick={handleCreateHotel}>
                    Create hotel
                </button>
            </form>
        </div>
    </div>
    </div>
    </>
    :
    (
        <div className="notLoggedIn">
        <p> You are not logged in </p>
        <Navigate replace to="/" />
        </div>
    )
    }
    </div>
    )
}

export default CreateHotel