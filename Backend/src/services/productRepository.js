import { Product } from "../models/productModel.js"

export const createProducts=async(data)=>{
    return await Product.create(data)
}
export const getAllProducts=async()=>{
    return await Product.find()
}