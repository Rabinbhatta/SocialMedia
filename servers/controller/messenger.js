
import Message from "../models/message.js"

export const getUserMessage = async(req,res)=>{
    try {
        const userID = req.params.sender
        const message = await  Message.find({
            $or: [
                { sender: userID },
                { receiver: userID }
            ]
        })        
        if(message){
            res.status(202).json({message})
        }
    } catch (error) {
        res.status(404).json({msg:"not found"})
    }
}