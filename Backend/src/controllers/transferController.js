import mongoose from "mongoose";
import { createTransfer, getTransfer } from "../services/transferRepository.js";
import { getStockByProductAndStore } from "../services/stockRepository.js";
import { Stock } from "../models/stockModel.js";
import Transfer from "../models/transferModel.js";

export const addTransfer = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        let useTransactions = true;
        try {
            session.startTransaction();
        } catch (e) {
            useTransactions = false;
        }

        const { product, fromStore, toStore, quantity } = req.body;

        if (!product || !fromStore || !toStore || !quantity) {
            if (useTransactions) await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (Number(quantity) <= 0) {
            if (useTransactions) await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: "Transfer quantity must be greater than zero"
            });
        }

        if (fromStore === toStore) {
            if (useTransactions) await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: "Source and destination stores must be different"
            });
        }

        const sourceStock = await getStockByProductAndStore(product, fromStore);
        if (!sourceStock || sourceStock.quantity < Number(quantity)) {
            if (useTransactions) await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: "Insufficient stock in the source store"
            });
        }

        const updatedSource = await Stock.findOneAndUpdate(
            { _id: sourceStock._id, quantity: { $gte: Number(quantity) } },
            { $inc: { quantity: -Number(quantity) } },
            { returnDocument: 'after', session: useTransactions ? session : null }
        );

        if (!updatedSource) {
            if (useTransactions) await session.abortTransaction();
            return res.status(400).json({
                success: false,
                message: "Insufficient stock in the source store"
            });
        }

        try {
            const destStock = await Stock.findOne({ product, store: toStore }).session(useTransactions ? session : null);
            if (destStock) {
                await Stock.updateOne(
                    { _id: destStock._id },
                    { $inc: { quantity: Number(quantity) } },
                    { session: useTransactions ? session : null }
                );
            } else {
                await Stock.create(
                    [{ product, store: toStore, quantity: Number(quantity) }],
                    { session: useTransactions ? session : null }
                );
            }

            const [transfer] = await Transfer.create(
                [{ product, fromStore, toStore, quantity: Number(quantity) }],
                { session: useTransactions ? session : null }
            );

            if (useTransactions) {
                await session.commitTransaction();
            }

            return res.status(201).json({
                success: true,
                message: "Stock transferred successfully",
                transfer
            });

        } catch (innerError) {
            if (useTransactions) {
                await session.abortTransaction();
            } else {
                await Stock.updateOne({ _id: sourceStock._id }, { $inc: { quantity: Number(quantity) } });
            }
            throw innerError;
        }

    } catch (error) {
        if (session.inTransaction()) {
            await session.abortTransaction();
        }
        return res.status(500).json({
            success: false,
            message: error.message
        });
    } finally {
        session.endSession();
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