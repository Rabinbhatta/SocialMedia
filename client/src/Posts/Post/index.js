import React, { useState,useEffect } from 'react'
import "./styles.css"
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { CiShare1 } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { IoSend } from "react-icons/io5";

const Post = ({creator,post,setUpdateComment,commentUsers}) => {
  const [isLiked,setIsLiked] = useState(false)
 const [onComment,setOnComment] = useState(false)
  const user = useSelector((state)=>state.user)
  const [likeNumber,setLikeNumber]= useState(0)
  const [comment,setComment] =useState("")
 

   const handleLike = async()=>{
    if(!isLiked){
        const response = await fetch(`http://localhost:3001/posts/like/${post._id}`,{
          method:"PUT",
          headers:{"Content-Type":"application/json"},
          credentials:"include",
        })
        const result = await response.json()
        console.log(result)
        setIsLiked(true)
        setLikeNumber(likeNumber+1)
    }else{
      const response = await fetch(`http://localhost:3001/posts/dislike/${post._id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        credentials:"include",
      })
      const result = await response.json()
      console.log(result)
      setIsLiked(false)
      setLikeNumber(likeNumber-1)
    }
   }

   const handleComment = ()=>{
        setOnComment(!onComment)
        console.log("done")
   }

   const checkLikePost = ()=>{
    const likedUser = post?.likeCount;
    setLikeNumber(likedUser?.length)
    for(const i of likedUser){
      if(i==user?._id){
        setIsLiked(true)
      }
    }
    console.log(likeNumber)
   }

   const handleUserComment = async()=>{
      const response = await fetch(`http://localhost:3001/posts/comment/${post._id}`,{
        method:"PUT",
        headers:{"Content-Type":"application/json"},
        credentials:"include",
        body: JSON.stringify({content:comment})
      })
      const result = await response.json()
      console.log(result)
      setComment("")
      setUpdateComment(true)
   }
  
   useEffect(()=>{
      checkLikePost()
   },[])

  return (
    <div className='postContainer'>
        <div className='post'>
        <div className='profile'>
            <img src={creator?.profilepicture}/>
         </div>
         <div>{creator.firstName} {creator.lastName}</div>
        </div>
        <div className='postDescription'>
                <div>{post.description}</div>
                <div className='postImage'>
                      <img src={post.imageURL} />
                </div>
                <div className='details'>
                        <div>
                            {likeNumber} <AiFillLike style={{color:"rgb(25, 185, 238);",fontSize:"17px" }}/>
                        </div>
                        <div>{post.comment.length} comment</div>
                </div>
                <hr/>
                <div className='interaction'>
                  <button onClick={handleLike}>{!isLiked?<AiOutlineLike/>:<AiFillLike style={{color:"#1E76FF"}} />} Like </button>
                   <button onClick={handleComment}><FaRegCommentDots/> Comment</button>
                   <button><CiShare1/> Share</button>
                </div>
                <hr/>
                {commentUsers?.length != 0 ? onComment &&  <div className='userCommentContainer'>{commentUsers.map((i)=>{return <div className='commentSection'>
                  <div className='profile'>
                    <img src={i?.commentUser?.profilepicture} alt='' />
                 </div>
                 <div className='commentUser'>
                  <div>{i?.commentUser?.firstName} {i?.commentUser?.lastName} </div>
                  <div>{i?.content}</div>
                 </div>
                </div>})}</div> :<div></div>}
                <div className='userComment'>
                <div className='profile'>
                    <img src={user?.profilepicture} alt='' />
                 </div>
                 <input placeholder='Write a comment...' value={comment} onChange={(e)=>setComment(e.target.value)}  />
                 <button onClick={handleUserComment}><IoSend/></button>
                 
                </div>
        </div>
        
    </div>
  )
}

export default Post