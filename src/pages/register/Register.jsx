import React from 'react'
import './register.scss'
import Navbar from '../../components/navbar/Navbar'
import { useNavigate  } from 'react-router-dom'
import { Link } from 'react-router-dom'



const Register = () => {

  const navigate = useNavigate();


  return (
    <>
    <Navbar />
    <div className="register-page">
      <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, illo.</p>
      <div className="register-panel">
        <input type="text" 
        className="regItem"
        id="username" 
        placeholder="username"/>
        <input type="email" 
        className="regItem"
        id="email" 
        placeholder="e-mail"/>
        <input type="password"
        className="regItem"
        id="password"
        placeholder="password" />
        <Link to='/' style={{textDecoration: 'none', color: 'inherit'}}> 
        <button className="regButton regButtonText"> Create account </button>
        </Link>
      </div>
    </div>
    </>
  )
}

export default Register