import express from "express";
import {getPost,createPost, likePost, dislikePost, comment, deletePost} from "../controller/posts.js"


const router = express.Router();

router.get("/",getPost)
router.post("/upload",createPost)
router.put("/like/:postId",likePost)
router.put("/dislike/:postId",dislikePost)
router.put("/comment/:postId",comment)
router.delete("/delete/:postId",deletePost)

export default router