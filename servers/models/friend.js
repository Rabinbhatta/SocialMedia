import mongoose from "mongoose";
import User from "./user.js";
import { Schema } from "mongoose";


const friendSchema = mongoose.Schema({
    info:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:["requested","accepted","rejected"],
        required:true
    }
})

const Friend = mongoose.model("Friend",friendSchema)

export default Friend