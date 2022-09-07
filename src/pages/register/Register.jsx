import React from 'react'
import './register.scss'
import Navbar from '../../components/navbar/Navbar'
import { useState } from 'react'
import { useContext } from 'react'
import { RegisterContext } from '../../context/RegisterContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const Register = () => {

  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  })

  
  const { loading, error, registerDispatch } = useContext(RegisterContext);

  const handleChange = (e) => {
    setCredentials((prev) => ({...prev, [e.target.id]: e.target.value}))
  }

  const handleClick = async (e) => {
    e.preventDefault();
    registerDispatch({type: "REGISTER_START"});
    try {
      const res = await axios.post("/auth/register", credentials);
      registerDispatch({type: "REGISTER_SUCCESS", payload: res.data.details});
      navigate("/login");
    }
    catch(err) {
      registerDispatch({type: "REGISTER_FAILED", payload: err.response.data })
    }
  } 

  return (
    <>
    <Navbar />
    <div className="register-page">
      <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, illo.</p>
      <div className="register-panel">
        <input type="text" 
        className="regItem"
        onChange={handleChange}
        id="username" 
        placeholder="username"/>
        <input type="email" 
        className="regItem"
        onChange={handleChange}
        id="email" 
        placeholder="e-mail"/>
        <input type="password"
        onChange={handleChange}
        className="regItem"
        id="password"
        placeholder="password" />
        <button disabled={loading} onClick={handleClick} className="regButton regButtonText"> Create account </button>
      </div>
      {error && 
        <div className="errorMessage"> Error: {error.message} </div>
      }
    </div>
    </>
  )
}

export default Register