import React, { useEffect, useState } from 'react'
import "./styles.css"
import Post from './Post'

const Posts = () => {
  const [allPost,setAllPost] = useState([])
      const getPosts = async()=> {
        const response = await fetch("http://localhost:3001/posts",{
          method:"GET",
          headers:{"Contain-Type":"application/json"},
          credentials:"include",
        })
        const result = await response.json()
        console.log(result)
        setAllPost(result)
}

useEffect(()=>{
  getPosts()
},[])
  return (
    <div className='postsContainer'>
      <div>
      {allPost.length !== 0? (allPost.map((post)=><div><Post creator={post.user} post={post.post}/></div>)):<div>No Post</div>}
      </div>
      
      
    </div>
  )
}

export default Posts