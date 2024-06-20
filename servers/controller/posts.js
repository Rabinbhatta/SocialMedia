import PostMessage from "../models/posts.js"
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
          const newPost = await new PostMessage(Post);
          await newPost.save();
          res.status(202).json(newPost);
     } catch (error) {
          res.status(404).json({message: error.message})
     }
}