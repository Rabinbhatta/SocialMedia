import React,{useState} from 'react'
import "./styles.css"
import { BiLogoFacebookCircle  } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { MdHomeFilled } from "react-icons/md";
import { SiYoutubegaming } from "react-icons/si";
import { MdGroups } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaFacebookMessenger } from "react-icons/fa";
import { CgMenuGridR } from "react-icons/cg";
import {useSelector} from "react-redux"
import Logout from '../logout';

export const Navbar = () => {
  const user = useSelector((state)=>state.user)
  const[logout,setlogout] = useState(false)

  const handleOnClick = ()=>{
    setlogout(!logout)
  }
  return (
    <div className='navContainer'>
      <div className='navbar'> 
      <BiLogoFacebookCircle className='icon'/>
      <div className='search'>
            <CiSearch className='icons'/>
            <input placeholder='search facebook'/>
      </div>
      <div className='navMid'>
      <MdHomeFilled />
      <MdOutlineOndemandVideo/>
      <CiShop/>
      <SiYoutubegaming/>
      <MdGroups/>
      </div>

      <div className='navEnd'>
        <CgMenuGridR/>
        <FaFacebookMessenger/>
        <IoNotifications/>
        <div className='profile' onClick={handleOnClick}>
          <img src={user?.profilepicture}/>
        </div>
      </div>
      </div>
      {logout&&<div>
        <Logout/>
      </div>}
    </div>
  )
}