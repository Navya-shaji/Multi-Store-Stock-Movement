import express from "express" 
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import ConnectDb from "./config/db.js";
import Userrouter from "./routes/router.js";


const app=express()
app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json())
ConnectDb()

const PORT=process.env.PORT||1212

app.use('/',Userrouter)
app.listen(PORT,()=>{
    console.log("Backend connected")
})