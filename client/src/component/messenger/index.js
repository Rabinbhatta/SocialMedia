import React, { useEffect } from 'react'
import {io} from "socket.io-client"
import "./styles.css"

const socket = io("http://localhost:3001")

const Messenger = () => {
    const handleClick = ()=>{
      socket.on()
    }

  return (
    <div className='messengerContainer'>
      <input placeholder='Enter message'/>
      <button onClick={handleClick}>Send</button>
    </div>
  )
}

export default Messenger