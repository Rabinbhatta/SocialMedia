import Post from "../models/posts.js"
import User from "../models/user.js"
import {v2 as cloudinary} from "cloudinary"

export const getPost = async (req,res)=>{
     try {
          const Posts = await Post.find()
          const allPost = []
          for(const post of Posts){
             const user = await User.findById(post.creator)
             allPost.push({post,user})
          }
          res.status(202).json(allPost);
     } catch (error) {
          res.status(404).json({message: error.message})
     }
}




export const createPost = async (req,res)=>{
     try {
          const { description,creator,likeCount,createdAt,date} = req.body;
          if (!req.files || !req.files.photo) {
               return res.status(400).json({ message: 'No file uploaded' });
           }
          const file =  req.files.photo
          const result = await cloudinary.uploader.upload(file.tempFilePath)
          const newPost = new Post({
               imageURL:result.secure_url,
               description,
               creator,
               likeCount,
               createdAt,
               date
          })

          const savedPost = await newPost.save()
          
          res.status(202).json(savedPost);

        
     } catch (error) {
          res.status(404).json({message: error.message})
     }
}

export const deletePost = async(req,res)=>{
     try {
      const PostId = req.params.postId;
      const post = await Post.findByIdAndDelete(PostId,{new:true})
      if(!post){
           res.status(404).json({message: "user not found"})
      }
      res.status(201).json({post})

     } catch (error) {
      res.status(404).json({message: error.message})
     }

}

export const likePost = async(req,res)=>{
         try {
          const PostId = req.params.postId;
          const updateLike = await Post.findByIdAndUpdate(PostId,{$push:{likeCount:res.user}},{new:true})
          if(!updateLike){
               res.status(404).json({message: "user not found"})
          }
          res.status(201).json({updateLike})

         } catch (error) {
          res.status(404).json({message: error.message})
         }

}

export const dislikePost = async(req,res)=>{
     try {
      const PostId = req.params.postId;
      const updatedisLike = await Post.findByIdAndUpdate(PostId,{$pull:{likeCount:res.user}},{new:true})
      if(!updatedisLike){
          res.status(404).json({message: "user not found"})
     }
      res.status(202).json({updatedisLike})

     } catch (error) {
      res.status(404).json({message: error.message})
     }

}

export const comment = async(req,res)=>{
     try {
          const {userID,content} = req.body;
          const PostId = req.params.postId;
          const updateComment = await Post.findByIdAndUpdate(PostId, {$push : {comment:  {userID,content}}},{new:true})

          if(!updateComment){
               res.status(404).json({message: "user not found"})
          }
           res.status(202).json({updateComment})
     } catch (error) {
          res.status(404).json({message: error.message})
     } 
}