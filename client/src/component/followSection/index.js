import React, { useEffect, useState } from 'react';
import { Follow } from './follow';
import './styles.css';

export const FollowSection = () => {
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

  useEffect(() => {
    getAllUser();
    setUpdateFollow(false)
  }, [updateFollow]);

  return (
    <div className="followSecContainer" id='left'>
      <h1>People you may know</h1>
      <div>
        {allUser.length != 0 ? allUser?.map((users) => (
          <div key={users._id}>
            <Follow users={users} setUpdateFollow={setUpdateFollow} />
          </div>
        )):<div>
          User not found
        </div>}
      </div>
    </div>
  );
};
