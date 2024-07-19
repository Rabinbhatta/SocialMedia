import express from "express";
import {getPost,createPost, likePost, dislikePost, comment, deletePost} from "../controller/posts.js"
import  {jwt_verify}  from "../middleware/jwt_verify.js";


const router = express.Router();

router.get("/",getPost)
router.post("/upload",jwt_verify,createPost)
router.put("/like/:postId",jwt_verify,likePost)
router.put("/dislike/:postId",jwt_verify,dislikePost)
router.put("/comment/:postId",comment)
router.delete("/delete/:postId",deletePost)

export default router