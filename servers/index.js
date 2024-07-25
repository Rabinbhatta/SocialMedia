import express  from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import postsroute from "./routers/posts.js"
import authroute from "./routers/auth.js"
import fileUpload from "express-fileupload"
import {v2 as cloudinary} from "cloudinary"
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import {createServer} from "http"


dotenv.config();





const app = express();
const https = createServer(app)
 const io = new Server(https,{
    cors:{
        origin:"http://localhost:3000"
    }
 });



io.on("connection",(socket)=>{
    console.log("Your connected")
    socket.on("disconnection",()=>console.log("you are disconnected"))
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg); // Broadcast message to all clients
      });
})

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors({
    origin: 'http://localhost:3000', // Your React app domain
    credentials: true // Allow credentials (cookies) to be sent
}));
app.use(fileUpload({
    useTempFiles:true
}))
app.use(cookieParser())

app.use("/posts",postsroute)
app.use("/auth",authroute)

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name, 
    api_key: process.env.cloudinary_api_key, 
    api_secret: process.env.cloudinary_api_secret
})


mongoose.set('strictQuery', true)

mongoose.connect(process.env.MONGODB, {useNewURLParser: true,useUnifiedTopology: true}
    ).then(()=> https.listen(process.env.PORT,()=>console.log(`Server is listening at ${process.env.PORT}`))
    ).catch((error)=>console.log(error.message))

   