import PostMessage from "../models/posts.js"
import {v2 as cloudinary} from "cloudinary"

export const getPost = async (req,res)=>{
     try {
          const PostMessages = await PostMessage.find()
          res.status(202).json(PostMessages);
     } catch (error) {
          res.status(404).json({message: error.message})
     }
}



export const createPost = async (req,res)=>{
     try {
          const Post = req.body;
          if (!req.files || !req.files.photo) {
               return res.status(400).json({ message: 'No file uploaded' });
           }
          const file =  req.files.photo
          const result = await cloudinary.uploader.upload(file.tempFilePath)
          
          res.status(202).json(result);

        
     } catch (error) {
          res.status(404).json({message: error.message})
     }
}