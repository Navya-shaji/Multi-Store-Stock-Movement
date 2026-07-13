import { createTransfer, getTransfer } from "../services/transferRepository.js";
import { getStockByProductAndStore } from "../services/stockRepository.js";
import { Stock } from "../models/stockModel.js";
import Transfer from "../models/transferModel.js";

export const addTransfer = async (req, res) => {
    try {
        const { product, fromStore, toStore, quantity } = req.body;

        if (!product || !fromStore || !toStore || !quantity) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (Number(quantity) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Transfer quantity must be greater than zero"
            });
        }

        if (fromStore === toStore) {
            return res.status(400).json({
                success: false,
                message: "Source and destination stores must be different"
            });
        }

        const sourceStock = await getStockByProductAndStore(product, fromStore);
        if (!sourceStock || sourceStock.quantity < Number(quantity)) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock in the source store"
            });
        }

        const updatedSource = await Stock.findOneAndUpdate(
            { _id: sourceStock._id, quantity: { $gte: Number(quantity) } },
            { $inc: { quantity: -Number(quantity) } },
            { returnDocument: 'after' }
        );

        if (!updatedSource) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock in the source store"
            });
        }

        try {
            const destStock = await Stock.findOne({ product, store: toStore });
            if (destStock) {
                await Stock.updateOne(
                    { _id: destStock._id },
                    { $inc: { quantity: Number(quantity) } }
                );
            } else {
                await Stock.create({
                    product,
                    store: toStore,
                    quantity: Number(quantity)
                });
            }

            const transfer = await Transfer.create({
                product,
                fromStore,
                toStore,
                quantity: Number(quantity)
            });

            return res.status(201).json({
                success: true,
                message: "Stock transferred successfully",
                transfer
            });

        } catch (innerError) {
            await Stock.updateOne({ _id: sourceStock._id }, { $inc: { quantity: Number(quantity) } });
            throw innerError;
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getTransfers = async (req, res) => {
    try {
        const transfers = await getTransfer();

        return res.status(200).json({
            success: true,
            transfers
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};