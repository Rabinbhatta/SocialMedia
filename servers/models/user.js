import mongoose, { SchemaType } from "mongoose"
import jwt from "jsonwebtoken";


const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        min : 8,
        max: 40,
        required: true
        
    },
    lastName: {
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
    profilepicture:{
          type:String,
          default:""
    },
    following:{
        type:Array,
        default:[]
    },
    followers:{
        type:Array,
        default:[]
    }
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