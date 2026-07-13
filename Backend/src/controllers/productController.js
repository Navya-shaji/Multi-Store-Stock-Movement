import { createProducts, getAllProducts } from "../services/productRepository.js"

export async function createProduct(req, res) {
    try {
        const { name, sku } = req.body
        console.log(req.body)
        if (!name || !sku) {
            return res.status(400).json({
                success: false,
                message: "name and sku is required"
            })
        }
        const Product = await createProducts({ name, sku })
        return res.status(201).json({
            message: "Product Created",
            Product: Product
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export async function getAllProduct(req, res) {
    try {
        const Products = await getAllProducts()
        if (!Products) {
            return res.status(400).json({
                success: false,
                message: "Product not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            Products
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
