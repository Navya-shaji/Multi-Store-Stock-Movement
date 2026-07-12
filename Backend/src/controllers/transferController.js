import { createTransfer, getTransfer } from "../services/transferRepository.js";



export const addTransfer = async (req, res) => {
    try {
        const { product, fromStore, toStore, quantity } = req.body;

        const transfer = await createTransfer({
            product,
            fromStore,
            toStore,
            quantity
        });

        return res.status(201).json({
            success: true,
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