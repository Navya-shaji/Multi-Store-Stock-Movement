import { createStocks, getAllStcoks, getStockByID, updateStock } from "../services/stockRepository.js"

export async function createStock(req, res) {
    try {
        const { product, store, quantity } = req.body
        if (!product || !store || !quantity) {
            return res.status(400).json({
                success: false,
                message: "Required all fields"
            })
        }
        const Stock = await createStocks({ product, store, quantity })
        return res.status(200).json({
            success: true,
            message: "Stock created successfully"
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export async function getAllStock(req, res) {
    try {
        const { threshold } = req.query
        const Stocks = await getAllStcoks(threshold)
        return res.status(200).json({ success: true, message: "Stock fetched successfully", Stocks })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export async function getOneStock(req, res) {
    try {
        const { stockId } = req.params
        const stock = await getStockByID(stockId)
        return res.status(200).json({ success: true, message: "Stcok fetched successfully" })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export async function getStockByProductStore(req, res) {
    try {
        const { ProductId, StoreId } = req.params
        const Stock = await getStockByProductStore({ ProductId, StoreId })
        return res.status(200).json({ success: true, message: "Stcok fetched successfully" })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export async function EditStock(req, res) {
    try {
        const { stockId, change } = req.body
        if (!stockId || change === undefined) {
            return res.status(400).json({ success: false, message: "stockId and change are required" })
        }
        const stock = await updateStock(stockId, Number(change))
        if (!stock) {
            return res.status(400).json({ success: false, message: "stock record not found" })
        }
        return res.status(200).json({ success: true, message: "Stock Updated successfully", stock })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}