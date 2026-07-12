import { Stock } from "../models/stockModel.js"
import { Store } from "../models/storeModel.js"

export const createStocks=async(data)=>{
    return await Stock.create(data)
}

export const getAllStcoks=async()=>{
    return await Stock.find()
}

export const getStockByID=async(id)=>{
    return await Stock.findById(id)
}
export const getStockByProductAndStore=async(ProductId,StoreId)=>{
    return await Stock.findOne({
        product:ProductId,
        store:StoreId
    })
}
export const updateStock = async (id, change) => {
    return await Stock.findByIdAndUpdate(
        id,
        { $inc: { quantity: change } },
        { new: true }
    );
};