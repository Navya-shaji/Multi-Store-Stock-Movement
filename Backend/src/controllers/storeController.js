import { createStores, getAllStores } from "../services/storeRepository.js"

export async function createStore(req, res) {
    try {
        const { name } = req.body
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Store name is required"
            })
        }
        const Store = await createStores({ name })
        return res.status(201).json({
            message: "Store Created",
            Store: Store
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export async function getAllStore(req,res) {
    try {
        const Stores=await getAllStores()
        if(!Stores){
            return res.status(400).json({
                success:false,
                message:"Stores not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Stores fetched successfully",
            Stores
        })
    } catch (error) {
          return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}