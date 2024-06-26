import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    author:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
})

const Comment =  mongoose.model("Comment",commentSchema)

export default Comment