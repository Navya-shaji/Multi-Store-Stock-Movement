import mongoose from "mongoose";
import dotenv from 'dotenv';

async function ConnectDb() {
    const URI=process.env.MONGOURI
    try {
        await mongoose.connect(URI)
        console.log("Mongo db connected successfully")
    } catch (error) {
        console.error("Mongoose error")
        process.exit(1)
    }
}

export default ConnectDb