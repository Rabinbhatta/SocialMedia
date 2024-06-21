import mongoose, { SchemaType } from "mongoose"
import jwt from "jsonwebtoken";
import  Friend  from "./friend.js";
import PostMessage from "./posts.js";

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        min : 8,
        max: 40,
        required: true
        
    },
    lastname: {
        type: String,
        min : 8,
        max: 40,
        required: true
        
    },
    email: {
        type: String,
        min : 8,
        max: 40,
        required: true
        
    },
    password: {
        type: String,
        min : 8,
        max: 40,
        required: true
        
    },
    address: {
        type: String,
        min : 8,
        max: 40,
        required: true
        
    },
    friends:[{type:mongoose.Schema.Types.ObjectId,ref:"Friend"}],
    post:[{type:mongoose.Schema.Types.ObjectId,ref:"PostMessage"}]
})

UserSchema.methods.generateToken = async()=>{
    try {
        return jwt.sign({},process.env.JWT_KEY,{expiresIn:"1d"})
    } catch (error) {
        return error.message
    }
}

 const User = mongoose.model("User",UserSchema)



 export default User