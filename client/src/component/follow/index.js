import "./styles.css"

import React from 'react'
import { useSelector } from "react-redux"
export const Follow = ({users}) => {
  const user = useSelector((state)=>state.user)
 
 
     const handleClick = async()=>{
           const response = await fetch(`http://localhost:3001/auth/follow/${user._id}`,{
            method:'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({id:users._id}),
           })
           const result = await response.json()
           console.log(result)
          
    }

    // const handleClick = async () => {
    //   try {
    //     const response = await fetch(`http://localhost:3001/auth/follow/${user._id}`, {
    //       method: 'PUT',
    //       headers: { 'Content-Type': 'application/json' },
    //       credentials: 'include',
    //       body: JSON.stringify({ id: users._id }), // Correctly formatting the body
    //     });
    //     const result = await response.json();
    //     console.log(result);
    //     // Handle response and update UI accordingly
    //   } catch (error) {
    //     console.error('Error following user:', error);
    //     // Display error message to the user
    //   }
    // };
  return (
    <div className="followContainer">
        <div className="image">
              <img src={users.profilepicture} alt="profile" />
        </div>
        <div className="followDescription">
            <div>{users.firstName+users.lastName}</div>
            <div className="followingContainer">
            <div className="following">Following:{users.following.length},Followers:{users.followers.length}</div>
            <button className="followBtn" onClick={handleClick}>Follow</button>
            </div>

        </div>
    </div>
  )
}
