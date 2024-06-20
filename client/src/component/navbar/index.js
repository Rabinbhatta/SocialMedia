import React from 'react'
import "./styles.css"
import { BiLogoFacebookCircle  } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";

export const Navbar = () => {
  return (
    <div className='navContainer'>
      <div className='navbar'> 
      <BiLogoFacebookCircle className='icon'/>
      <div className='search'>
            <CiSearch className='icons'/>
            <input placeholder='search facebook'/>
      </div>
      </div>
    </div>
  )
}