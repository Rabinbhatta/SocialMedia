import mongoose from "mongoose";

const postSchema = mongoose.Schema({
imageURL: {
    type:String,
    required:true},
description: {
    type:String,
    required:true
},
creator: {
    type:String,
    required:true
},
comment : [{
    userID:String,
    content:String,
    date:{type:Date,default:Date.now}
}],
likeCount: {
    type:Array,
    default: []
},
createdAt: {
    type: Date,
    default: new Date()
},  
date:{type:Date,default:Date.now}
})

const Post = mongoose.model('Post',postSchema)

export default Post;