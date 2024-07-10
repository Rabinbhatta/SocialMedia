export  const  jwt_verify = async(res,req)=>{
    try {
       
        const token = req.cookies.token
        jwt_verify.verify(token,process.env.JWT_KEY,(err,user)=>{
            if(err) return res.status(404)
            req.user = user;
            next()
        })
    } catch (error) {
        
    }
}