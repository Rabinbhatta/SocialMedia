import React, { useEffect, useState } from 'react'
import "./styles.css"
import Following from './following'

const Followings = () => {
  const [followingUser,setFollowingUser] = useState([])
  const getfollowinguser = async()=>{
    const response = await fetch("http://localhost:3001/auth/following",{
      method:"GET",
      headers:{"Content-Type" :"application/json"},
      credentials:"include"
    })
    const result = await response.json()
    console.log(result.followings)
    setFollowingUser(result.followings)
  }

  useEffect(()=>getfollowinguser,[])
  return (
    <div className='followSecContainer' >
      <h1>Following</h1>
      <div>
      {followingUser.length != 0 ? (followingUser.map((user)=> (<div><Following user={user} /></div>))):
      (<div>No one followed yet</div>)}
      </div>
       </div>)



  } 
  

export default Followings 