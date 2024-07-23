import React, { createContext,useState,useEffect } from 'react'


export const FollowContext = createContext()
const FollowContextProvider = ({children}) => {
    const [allUser, setAllUser] = useState([]);
    const [updateFollow,setUpdateFollow] = useState(false)
   console.log(updateFollow)
    const getAllUser = async () => {
      try {
        const response = await fetch('http://localhost:3001/auth/allUser', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });
        const result = await response.json();
        console.log(result.notFollowed);
        if (result) {
          setAllUser(result.notFollowed); // Assuming `result` is an array of users
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
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
  return (
    <FollowContext.Provider value={{allUser,updateFollow,getAllUser,setUpdateFollow,getfollowinguser,followingUser}}>
        {children}
    </FollowContext.Provider>
  )
}

export default FollowContextProvider