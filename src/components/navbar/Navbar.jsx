import React, { useContext } from 'react';
import './navbar.scss'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const { user, authDispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    authDispatch({type: "LOGOUT"})
    navigate('/');
  }


  return (
    <nav className='navbar'>
        <div className="navContainer">
          <Link to="/" style={{color: 'inherit', textDecoration: 'none'}}>
            <span className="logo"> booking </span>
          </Link>
            { user ? 
            <div className="logged"> <p className="welcomeText"> Welcome back, {user.username} </p> 
            <Link to='/' style={{color: 'inherit', textDecoration: 'none'}}>
            <button className="btn-log" onClick={handleLogout}> Logout </button>
            </Link>
            </div> 
            : 
            (
            <div className='navItems'>
          <Link to='/register' style={{color: 'inherit', textDecoration: 'none'}}>
          <button className='navButton'> Register </button>
          </Link>
          <Link to='/login' style={{color: 'inherit', textDecoration: 'none'}}>
                <button className='navButton'> Login </button>
          </Link>
            </div>) }
        </div>
    </nav> 
  )
}

export default Navbar