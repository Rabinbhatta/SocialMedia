import React from 'react'
import "./styles.css"
import { FaPhotoVideo } from "react-icons/fa";

const Upload = () => {
  return (
    <div className='uploadContainer'>
        <div className='upload'>
          <div className="description">
          <div className='profile'></div>
               <input placeholder='Whats on your mind Rabin?'/>
          </div>
          <div>
            <input type='file' id='media'/>
            <label htmlFor='media'><FaPhotoVideo  className='photoVideo' type='file'/></label>
        <div>Photos</div>
        </div>
        <button>Submit Post</button>
        
        </div>
        
    </div>
  )
}

export default Upload