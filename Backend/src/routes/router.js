import express, { Router } from "express"
import { adminLogin, login, signup } from "../controllers/userController.js"
import { RoleMiddleware } from "../middleware/Rolemiddleware.js"
import { createProduct, getAllProduct } from "../controllers/productController.js"
import { createStore, getAllStore } from "../controllers/storeController.js"
import { createStock, EditStock, getAllStock, getStockByProductStore } from "../controllers/stockController.js"
import { getStockByID } from "../services/stockRepository.js"
import { addTransfer, getTransfers } from "../controllers/transferController.js"
const router=Router()
router.post('/signup',signup)
router.post('/login',login)
router.post('/adminlogin',adminLogin)

router.post('/product',RoleMiddleware,createProduct)
router.get('/product',getAllProduct)

router.post('/store',RoleMiddleware,createStore)
router.get('/store',RoleMiddleware,getAllStore)

router.post('/stock',RoleMiddleware,createStock)
router.get('/stock',getAllStock)
router.get('/stock/stockId',getStockByID)
router.get('/stock/ProductId/StoreId',getStockByProductStore)
router.put('/stock',RoleMiddleware,EditStock)

router.post("/transfer",RoleMiddleware, addTransfer);
router.get("/transfer", RoleMiddleware,getTransfers);


export default router