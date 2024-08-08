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
  
  const sender = useSelector((state)=>state.user._id)
  socket.emit("join",sender)
  
 
  const [selectedContact,setSelectedContact] = useState(null)
  const {followingUser,getfollowinguser} = useContext(FollowContext)
  const [receivedMessage,setReceivedMessage] =useState(null)
  const [userMessage,setUserMessage] = useState(null)
  const [message,setMessage] = useState("")
  const handleClick = ()=>{
    const receiver = selectedContact._id
    socket.emit("private_message",{sender,receiver,message})
    setUserMessage(previousMessage => [ ...previousMessage,{sender,message:message,receiver}])
    setMessage("")
  }
  useEffect(()=>{
    socket.on("private_message",({sendMessage,sender,receiver})=>{
      setUserMessage(previousMessage => [ ...previousMessage,{sender,message:sendMessage,receiver}])
      console.log({sendMessage,sender})
     })
  },[sender])
 
  const getUserMessage = async()=>{
    const response = await fetch(`http://localhost:3001/message/${sender}`,{
      method:"GET",
      credentials:'include',
      headers: {"Content-Type":"application/json"}
    })
    const result = await response.json()
    setUserMessage(result.message)
    console.log(result.message)

  }
  useEffect(()=>{
     getUserMessage();
  },[])
  return (

    <div className='messengerBody'>
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
              <div className='messagesContainer'>
              {userMessage.map((mes)=>{
                      return( 
                            <div className={mes.sender === selectedContact._id?"messageContainer":"messagesConatiner containerLeft"}>
                            {(mes.sender === selectedContact._id || mes.receiver === selectedContact._id) && 
                             <div className={mes.sender === selectedContact._id?"messages":"messages msg-left"}>
                                  {mes.message}
                                 </div>
                            
                                  }
                            </div>
                                
                          )
                          
                        }
                        
                      )
              }</div>
          
              <div className='search messagebox'>
                <input placeholder='Aa' value={message} onChange={(e)=>setMessage(e.target.value)}/>
                <button onClick={handleClick} ><IoSend/></button>
                
              </div>
            </div> || <div className='sendMessage'>
              
              Send a message</div>}
      </div>
      
    </div>
  )
}

export default Messenger