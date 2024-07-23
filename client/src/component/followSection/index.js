import React, { useEffect, useState,useContext } from 'react';
import { Follow } from './follow';
import './styles.css';
import {FollowContext} from '../followContext';

export const FollowSection = () => {
  const {setUpdateFollow,allUser,updateFollow,getAllUser,getfollowinguser} = useContext(FollowContext)

  useEffect(() => {
    getAllUser();
    setUpdateFollow(false)
    getfollowinguser()
  }, [updateFollow]);

  return (
    <div className="followSecContainer" id='left'>
      <h1>People you may know</h1>
      <div>
        {allUser.length != 0 ? allUser?.map((users) => (
          <div key={users?._id}>
            <Follow users={users} setUpdateFollow={setUpdateFollow} />
          </div>
        )):<div>
          User not found
        </div>}
      </div>
    </div>
  );
};
