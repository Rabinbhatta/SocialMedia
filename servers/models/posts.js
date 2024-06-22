import mongoose from "mongoose";

const postSchema = mongoose.Schema({
imageURL: String,
description: String,
creator: String,
tags: [String],
selected : String,
likeCount: {
    type:Number,
    default: 0
},
createdAt: {
    type: Date,
    default: new Date()
}
})

const PostMessage = mongoose.model('PostMessage',postSchema)

export default PostMessage;