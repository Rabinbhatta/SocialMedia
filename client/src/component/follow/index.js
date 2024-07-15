import "./styles.css"

import React from 'react'

export const Follow = ({name,profile}) => {
  return (
    <div className="followContainer">
        <div className="image">
              <img src={profile} alt="profile" />
        </div>
        <div className="followDescription">
            <div>{name}</div>
            <button className="followBtn">Follow</button>

        </div>
    </div>
  )
}
