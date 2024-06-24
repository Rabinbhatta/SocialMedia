import  express  from "express";
import { follow, login,register,unfollow,uploadProfilePic } from "../controller/auth.js";
const router = express.Router();

router.post("/login",login)

router.post("/register",register)

router.put("/profilepic/:userId",uploadProfilePic)

router.put("/follow/:userID",follow)

router.put("/unfollow/:userID",unfollow)

export default router