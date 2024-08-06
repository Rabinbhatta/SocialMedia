import React, { useEffect,useContext, useState } from 'react'
import {io} from "socket.io-client"
import "./styles.css"
import { Navbar } from '../navbar'
import { FollowContext } from '../followContext'
import { IoCall } from "react-icons/io5";
import { FaVideo } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import { useSelector } from 'react-redux'

const socket = io("http://localhost:3001")

const Messenger = () => {
  
  const userId = useSelector((state)=>state.user._id)
  socket.emit("join",userId)
  
 
  const [selectedContact,setSelectedContact] = useState(null)
  const {followingUser,getfollowinguser} = useContext(FollowContext)
  const [receivedMessage,setReceivedMessage] =useState(null)
  const [message,setMessage] = useState("")
  const handleClick = ()=>{
    const selectedId = selectedContact._id
    socket.emit("private_message",{userId,selectedId,message})
    setMessage("")
  }
  socket.on("private_message",(messages)=>{
   setReceivedMessage(messages)
  })
  return (
    <div>
      <Navbar/>
      <div className='messenger'>
      <div  className='messengerContainer'>
            <h2>Chats</h2>
            <div className='contacts' >
              {followingUser.map((following)=> 
                {
               
                  return(
                  <div className='contact' onClick={()=>setSelectedContact(following)} >
                  <div className='contactProfile'>
                        <img src={following.profilepicture} />
                  </div>
                  <div className = "contactDetail">
                            <div className='contactName'>{following.firstName} {following.lastName}</div> 
                            <div className='contactMessage'>no message</div>
                  </div>
             </div>
                )} )}
            </div>
      </div>
      {selectedContact && <div className='contactContainer'>
              <div className='contactNavbar'>
                <div className='contactNavbarInfo'>
                <div className='profile'>
                             <img src={selectedContact.profilepicture} />
                        </div>
                     <h2>{selectedContact.firstName} {selectedContact.lastName}</h2>
                </div>
                         
                <div className='contactIcon'>
                  <div><IoCall/></div>
                <div><FaVideo/></div>
              </div>
              </div>
              <div className='messages'>

              </div>
              <div className='search messagebox'>
                <input placeholder='Aa' value={message} onChange={(e)=>setMessage(e.target.value)}/>
                <button onClick={handleClick}><IoSend/></button>
                
              </div>
            </div> || <div className='sendMessage'>
              
              Send a message</div>}
      </div>
      
    </div>
  )
}

export default Messenger