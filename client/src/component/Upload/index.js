import React, { useState } from 'react';
import './styles.css';
import { FaPhotoVideo } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const Upload = () => {
  const user = useSelector((state) => state.user);
  const [fileSelected, setFileSelected] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [post,setPost] = useState({creator:user?.id,description:""})

  const handleOnChange = (event) => {
    const file = event.target.files[0];
    setFileSelected(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);
        
      };
      reader.readAsDataURL(file);
      
    }
   
  };
   
  const handleSubmit = async()=>{
    console.log("Clicked")
    const formdata = new FormData()
    formdata.append("photo",fileSelected)
    formdata.append("description",post.description)
    formdata.append("creator",post.creator)
    try{
      const PostResponse = await fetch('http://localhost:3001/posts/upload', {
        method: 'POST',
        credentials: 'include',
        body: formdata,
        
      });
         const Post = await PostResponse.json()
         console.log(Post)
        setFilePreview(null)
        setFileSelected(null)
        setPost({description:""})
    }catch(error){
      console.log(error)
    }
   
  }
  return (
    <div className="uploadContainer">
      <div className="upload">
        <div className="description">
          <div className="profile">
            <img src={user?.profilepicture} alt="Profile" />
          </div>
          <input placeholder="What's on your mind?" value={post.description} onChange={(e)=>setPost({...post,description:e.target.value})} />
        </div>
        <div>
          <input type="file" id="media" onChange={handleOnChange} />
          <label htmlFor="media">
            <FaPhotoVideo className="photoVideo" type="file" />
          </label>
          {filePreview && (
            <div>
              <img src={filePreview} alt="Preview" className="previewImage" />
            </div>
          )}
          <div>Photos</div>
        </div>
        <button  onClick={handleSubmit} >Submit Post</button>
      </div>
    </div>
  );
};

export default Upload;
