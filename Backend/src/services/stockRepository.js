import { Stock } from "../models/stockModel.js"
import { Store } from "../models/storeModel.js"

export const createStocks=async(data)=>{
    return await Stock.create(data)
}

export const getAllStcoks=async(threshold)=>{
    const query = {};
    if (threshold !== undefined && threshold !== null && threshold !== "") {
        query.quantity = { $lte: Number(threshold) };
    }
    return await Stock.find(query).populate("product").populate("store")
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
    const query = { _id: id };
    if (change < 0) {
        query.quantity = { $gte: Math.abs(change) };
    }
    return await Stock.findOneAndUpdate(
        query,
        { $inc: { quantity: change } },
        { new: true, runValidators: true }
    );
};