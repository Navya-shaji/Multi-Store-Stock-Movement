import mongoose from "mongoose";

const stockSchema=new mongoose.Schema({
    product:{
         type: mongoose.Schema.Types.ObjectId,
         ref:"Products",
         required:true
    },
    store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Store",
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        default:0,
        
    }
}
, {
    timestamps: true,
  }
)

export const Stock=mongoose.model("Stock",stockSchema)