import React from 'react'
import "./styles.css"
import { AiOutlineLike } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { CiShare1 } from "react-icons/ci";
import { AiFillLike } from "react-icons/ai";

const Post = ({user,post}) => {
  return (
    <div className='postContainer'>
        <div className='post'>
        <div className='profile'>
            <img src={user?.profilepicture}/>
         </div>
         <div>{user.firstName} {user.lastName}</div>
        </div>
        <div className='postDescription'>
                <div>{post.description}</div>
                <div className='postImage'>
                      <img src={post.imageURL} />
                </div>
                <div className='details'>
                        <div>
                            {post.likeCount} <AiFillLike style={{color:"rgb(25, 185, 238);",fontSize:"17px" }}/>
                        </div>
                        <div>{post.comment.length} comment</div>
                </div>
                <hr/>
                <div className='interaction'>
                <AiOutlineLike/>
                <FaRegCommentDots/>
                <CiShare1/>
                </div>
        </div>
        
    </div>
  )
}

export default Post