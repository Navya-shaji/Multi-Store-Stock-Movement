import { Stock } from "../models/stockModel.js"
import { Store } from "../models/storeModel.js"

export const createStocks = async (data) => {
    return await Stock.create(data)
}

export const getAllStcoks = async (data) => {
    if (data) {
        return await Stock.find({ quantity: { $lte: data } }).populate("product").populate("store");
    }
    return await Stock.find().populate("product").populate("store");
}

export const getStockByID = async (id) => {
    return await Stock.findById(id)
}

export const getStockByProductAndStore = async (ProductId, StoreId) => {
    return await Stock.findOne({
        product: ProductId,
        store: StoreId
    })
}

export const updateStock = async (id, change) => {
    const minQty = change < 0 ? -change : 0;
    return await Stock.findOneAndUpdate(
        { _id: id, quantity: { $gte: minQty } },
        { $inc: { quantity: change } },
        { returnDocument: "after" }
    );
}

export const deductStock = async (product, store, qtyNum) => {
    return await Stock.updateOne(
        { product, store, quantity: { $gte: qtyNum } },
        { $inc: { quantity: -qtyNum } }
    );
}