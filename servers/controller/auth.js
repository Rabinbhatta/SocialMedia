import User from "../models/user.js";
import bcrypt from "bcrypt";

export const register = async(req,res)=>{
    try {
        const {firstname, lastname , email , password , address} =  req.body;
        const user = await User.findOne({email});
        if(user){
            res.status(404).json({error :"Email already used!!"})
        }else{
        const passwordhash = await bcrypt.hash(password,10);
        const newUser = new User({
            firstname,
            lastname,
            email,
            address,
            password:passwordhash
        })

        const savedUser = await newUser.save();
        res.status(201).json(savedUser)
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

        }else{
            const isMatch = await bcrypt.compare(password,user.password)
            if(!isMatch){
                res.status(404).json({error :"Wrong password!!"})
            }else{
                res.status(200).json({msg:user, token:await user.generateToken()})
            }
        }
     } catch (error) {
        res.status(404).json({error :error.message})
     }
}