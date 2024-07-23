import React, { useContext, useEffect, useState } from 'react'
import "./styles.css"
import Following from './following'
import { FollowContext } from '../followContext'

const Followings = () => {
   const {followingUser,getfollowinguser} = useContext(FollowContext)
   useEffect(() => {
    getfollowinguser()
  },[]);
  
  return (
    <div className='followSecContainer' >
      <h1>Following</h1>
      <div>
      {followingUser?.length != 0 ? (followingUser?.map((user)=> (<div><Following user={user} /></div>))):
      (<div>No one followed yet</div>)}
      </div>
       </div>)



  } 
  

export default Followings 