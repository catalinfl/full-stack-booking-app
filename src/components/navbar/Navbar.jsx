import React from 'react';
import '../../css/navbar.css'


const Navbar = () => {
  return (
    <navbar className='navbar'>
        <div className="navContainer">
            <span className="logo"> booking </span>
            <div className='navItems'>
                <button className='navButton'> Register </button>
                <button className='navButton'> Login </button>
            </div>
        </div>
    </navbar>
  )
}

export default Navbar