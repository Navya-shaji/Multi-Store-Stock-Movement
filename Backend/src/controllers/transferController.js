import { createTransfer, getTransfer } from "../services/transferRepository.js";
import { deductStock, getStockByProductAndStore, updateStock, createStocks } from "../services/stockRepository.js";

export const addTransfer = async (req, res) => {
    try {
        const { product, fromStore, toStore, quantity } = req.body;

        if (!product || !fromStore || !toStore || !quantity) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const qtyNum = Number(quantity);
        if (qtyNum <= 0) {
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

        const deductResult = await deductStock(product, fromStore, qtyNum);

        if (deductResult.modifiedCount === 0) {
            return res.status(400).json({
                success: false,
                message: "Insufficient stock in the source store"
            });
        }

        const destStock = await getStockByProductAndStore(product, toStore);
        if (destStock) {
            await updateStock(destStock._id, qtyNum);
        } else {
            await createStocks({
                product,
                store: toStore,
                quantity: qtyNum
            });
        }

        const transfer = await createTransfer({
            product,
            fromStore,
            toStore,
            quantity: qtyNum
        });

        return res.status(201).json({
            success: true,
            message: "Stock transferred successfully",
            transfer
        });

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