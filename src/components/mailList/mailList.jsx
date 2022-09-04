import React from 'react'
import './mailList.scss'

const MailList = () => {
  return    (
    <div className="mail">
        <h1 className="mailTitle"> Save time, save money! </h1>
        <span className="mailDesc"> Sign up we'll send you a message </span>
        <div className="mailInputContainer">
            <input type="text" placeholder='Your email' />
            <button> Subscribe </button>
        </div>
    </div>
  )
}

export default MailList