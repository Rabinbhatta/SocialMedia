import User from "../models/user.js";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from "cloudinary"
import jwt from "jsonwebtoken"

export const register = async(req,res)=>{
    try {
        const {firstName, lastName , email , password , address} =  req.body;
        const user = await User.findOne({email});
        if(user){
            res.status(404).json({error :"Email already used!!"})
        }else{
        const passwordhash = await bcrypt.hash(password,10);
        const newUser = new User({
            firstName,
            lastName,
            email,
            address,
            password:passwordhash
        })
        const savedUser = await newUser.save();

        res.status(201).json({msg:"Sucess"})
         }
    } catch (error) {
        res.status(404).json({error :error.message})
    }
}

export const login = async(req,res)=>{
     try {
        const {email , password} = req.body;
        const user = await  User.findOne({email});
        if(!user){
            res.status(404).json({error :"User not found!!"})

        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            res.status(404).json({error :"Wrong password!!"})
        }else{
        const token =  jwt.sign(user.firstName,process.env.JWT_KEY)
        res.cookie('token', token, {
            httpOnly: true,
            secure: true, // Use secure cookies in production
            sameSite:  'Lax'
        });
        res.status(200).json({user});}    
     } catch (error) {
        res.status(404).json({error :error.message})
     }
}

export const uploadProfilePic = async(req,res)=>{
       try {
        const profile = req.files.profilepicture;
        const result = await cloudinary.uploader.upload(profile.tempFilePath);
        const profilepicture =  result.secure_url;
        const userID = req.params.userId;
        const user = await User.findByIdAndUpdate(userID,{profilepicture:profilepicture},{new:true})
        if(!user){
         res.status(404).json({error :error.message})
        }else{
            res.status(200).json({user})
        }
       
       } catch (error) {
        res.status(404).json({error :error.message})
       }

}

export const follow = async(req,res)=>{
    try {
        const userID = req.params.userID;
        const {followId} = req.body;
        if(userID==followId){
            res.status(404).json({error : "cannot follow own id"})
        }
        const updateUser = await User.findByIdAndUpdate(userID,{$push:{following:followId}},{new:true})
        const updateFollowUser = await User.findByIdAndUpdate(followId,{$push:{followers:userID}},{new:true})
        if(!updateUser&&!updateFollowUser){
            res.status(404).json({error :error.message})
           }
               res.status(200).json({updateUser,updateFollowUser})
           

    } catch (error) {
        res.status(404).json({error :error.message})
    }
}

export const unfollow = async(req,res)=>{
    try {
        const userID = req.params.userID;
        const {followId} = req.body;
        if(userID==followId){
            res.status(404).json({error : "cannot follow own id"})
        }
        const updateUser = await User.findByIdAndUpdate(userID,{$pull:{following:followId}},{new:true})
        const updateFollowUser = await User.findByIdAndUpdate(followId,{$pull:{followers:userID}},{new:true})
        if(!updateUser && !updateFollowUser){
            res.status(404).json({error :error.message})
           }
               res.status(200).json({updateUser,updateFollowUser})
           

    } catch (error) {
        res.status(404).json({error :error.message})
    }
}