import React from 'react'
import "./styles.css"
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom'

const Logout = () => {
   const navigate = useNavigate()
   const handleOnClick = async()=>{
    const response = await fetch("http://localhost:3001/auth/logout",{
      method:"GET",
 
      credentials:"include"
     })
    
     if(response.ok){
      navigate("/")
     }


        
    }
  return (
    <div className='logoutContainer'onClick={handleOnClick}>
            <div >
            Logout
            </div>
    </div>
  )
}

export default Logout