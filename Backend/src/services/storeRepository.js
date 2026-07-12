import { Store } from "../models/storeModel.js"

export const createStores=async(data)=>{
    return await Store.create(data)
}

export const getAllStores=async (data)=>{
    return await Store.find()
}