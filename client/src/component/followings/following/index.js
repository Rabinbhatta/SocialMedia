import React from 'react'
import "./styles.css"

const Following = ({user}) => {
  return (
    <div className='followingContainer'>
        <div className='profile'>
           <img src={user.profilepicture}/>
        </div>
        <div>{user.firstName}  {user.lastName}</div>
    </div>
  )
}

export default Following