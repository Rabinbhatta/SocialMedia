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


dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy : "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());
app.use(fileUpload({
    useTempFiles:true
}))

app.use("/posts",postsroute)
app.use("/auth",authroute)

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name, 
    api_key: process.env.cloudinary_api_key, 
    api_secret: process.env.cloudinary_api_secret
})


mongoose.set('strictQuery', true)

mongoose.connect(process.env.MONGODB, {useNewURLParser: true,useUnifiedTopology: true}
    ).then(()=> app.listen(process.env.PORT,()=>console.log(`Server is listening at ${process.env.PORT}`))
    ).catch((error)=>console.log(error.message))

   