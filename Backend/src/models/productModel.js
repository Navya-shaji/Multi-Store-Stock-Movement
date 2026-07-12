import mongoose, { Schema } from "mongoose"
import { type } from "node:os"

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    sku: {
        type: String,
        required: true,
        unique: true,
    },


}, {
    timestamps: true
})

export const Product = mongoose.model("Product", productSchema);
