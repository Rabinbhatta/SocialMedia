import  express  from "express";
import { follow, getAllUser, login,register,unfollow,uploadProfilePic } from "../controller/auth.js";
import { jwt_verify } from "../middleware/jwt_verify.js";

const router = express.Router();


router.post("/login",login)

router.post("/register",register)

router.put("/profilepic/:userId",uploadProfilePic)

router.put("/follow/:userID",jwt_verify,follow)

router.put("/unfollow/:userID",unfollow)

router.get("/allUser",jwt_verify,getAllUser)

export default router