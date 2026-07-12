import { User } from "../models/userModel.js"

export const createUser=async(userData)=>{
    return await User.create(userData)
}
export const findByEmail=async(email)=>{
    return await User.findOne({email})
}