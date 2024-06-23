import mongoose from "mongoose";

const postSchema = mongoose.Schema({
imageURL: String,
description: {
    type:String,
    required:true
},
creator: {
    type:String,
    required:true
},
comment : [[{type:mongoose.Schema.Types.ObjectId,ref:"Comment"}]],
likeCount: {
    type:Number,
    default: 0
},
createdAt: {
    type: Date,
    default: new Date()
}
})

const Post = mongoose.model('Post',postSchema)

export default Post;