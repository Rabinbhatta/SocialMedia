import jwt from "jsonwebtoken"
export  const  jwt_verify = (req, res, next)=>{
    try {
        const token = req.cookies.token
        const user = jwt.verify(token,process.env.JWT_KEY);
       if(user){
        next()}
    } catch (error) {
        res.clearCookie("token")
    }
}