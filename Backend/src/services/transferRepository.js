import Transfer from "../models/transferModel.js";

export const createTransfer = async (data) => {
    return await Transfer.create(data);
};

export const getTransfer = async () => {
    return await Transfer.find()
        .populate("product")
        .populate("fromStore")
        .populate("toStore");
}