import "./styles.css"

import React from 'react'
import { useSelector } from "react-redux"
export const Follow = ({users,setUpdateFollow}) => {
  const user = useSelector((state)=>state.user)
     const handleClick = async ()=>{
           const response = await fetch(`http://localhost:3001/auth/follow/${user._id}`,{
            method:'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({id:users._id}),
           })
           const result = await response.json()
           console.log(result)
           setUpdateFollow(true)
    }
    

  return (
    <div className="followContainer">
        <div className="profile">
              <img src={users.profilepicture} alt="profile" />
        </div>
        <div className="followDescription">
            <div>{users.firstName} {users.lastName}</div>
            <div className="notFollowingContainer">
            <div className="following">Following:{users.following.length}  Followers:{users.followers.length}</div>
            <button className="followBtn" onClick={handleClick}>Follow</button>
            </div>

        </div>
    </div>
  )
}
