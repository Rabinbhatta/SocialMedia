import  express  from "express";
import { login,register,uploadProfilePic } from "../controller/auth.js";
const router = express.Router();

router.post("/login",login)

router.post("/register",register)

router.put("/profilepic/:userId",uploadProfilePic)

export default router