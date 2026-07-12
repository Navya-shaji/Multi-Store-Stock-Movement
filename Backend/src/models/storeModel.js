import mongoose, { mongo } from "mongoose";

const storeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    }
})

export const Store=mongoose.model("Store",storeSchema)