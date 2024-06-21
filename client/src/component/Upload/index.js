import React from 'react'
import "./styles.css"
import { FaPhotoVideo } from "react-icons/fa";

const Upload = () => {
  return (
    <div className='uploadContainer'>
        <div className='upload'>
          <div className="description">
          <div className='profile'>
        </div>
        <input placeholder='Whats on your mind Rabin?'/>
          </div>
          <div><FaPhotoVideo className='photoVideo' type='file'/>
        <div>Photos</div></div>
        
        </div>
        
    </div>
  )
}

export default Upload