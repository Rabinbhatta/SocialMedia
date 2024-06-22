import express from "express";
import {getPost,createPost} from "../controller/posts.js"


const router = express.Router();

router.get("/",getPost)
router.post("/upload",createPost)

export default router