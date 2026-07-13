import test from "node:test";
import assert from "node:assert";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { Stock } from "../models/stockModel.js";
import { Product } from "../models/productModel.js";
import { Store } from "../models/storeModel.js";
import { updateStock, deductStock } from "../services/stockRepository.js";

dotenv.config();

const MONGO_URI = process.env.MONGOURI || "mongodb://127.0.0.1:27017/muti-store-stock-movement-test";

test.before(async () => {
    if (mongoose.connection.readyState === 0) {
        await mongoose.connect(MONGO_URI);
    }
    await Product.deleteMany({});
    await Store.deleteMany({});
    await Stock.deleteMany({});
});

test.after(async () => {
    await mongoose.connection.close();
});

test("Correct end-to-end transfer simulation", async () => {
    const product = await Product.create({ name: "Phone", sku: "PHONE-01" });
    const storeA = await Store.create({ name: "Store A" });
    const storeB = await Store.create({ name: "Store B" });

    const stockA = await Stock.create({ product: product._id, store: storeA._id, quantity: 15 });

    const qtyToTransfer = 5;

    const deductResult = await deductStock(product._id, storeA._id, qtyToTransfer);
    assert.strictEqual(deductResult.modifiedCount, 1);

    const destStock = await Stock.findOne({ product: product._id, store: storeB._id });
    if (destStock) {
        await Stock.updateOne({ _id: destStock._id }, { $inc: { quantity: qtyToTransfer } });
    } else {
        await Stock.create({ product: product._id, store: storeB._id, quantity: qtyToTransfer });
    }

    const updatedStockA = await Stock.findById(stockA._id);
    const updatedStockB = await Stock.findOne({ product: product._id, store: storeB._id });

    assert.strictEqual(updatedStockA.quantity, 10);
    assert.strictEqual(updatedStockB.quantity, 5);
});

test("Rejection of a transfer that exceeds available stock", async () => {
    const product = await Product.create({ name: "Laptop", sku: "LAP-02" });
    const storeA = await Store.create({ name: "Store A" });

    await Stock.create({ product: product._id, store: storeA._id, quantity: 3 });

    const qtyToTransfer = 5;

    const deductResult = await deductStock(product._id, storeA._id, qtyToTransfer);
    assert.strictEqual(deductResult.modifiedCount, 0);

    const checkStock = await Stock.findOne({ product: product._id, store: storeA._id });
    assert.strictEqual(checkStock.quantity, 3);
});

test("Concurrency never-negative stock guarantee test", async () => {
    const product = await Product.create({ name: "Tablet", sku: "TAB-03" });
    const store = await Store.create({ name: "Store A" });
    const stock = await Stock.create({ product: product._id, store: store._id, quantity: 10 });

    const requests = [
        updateStock(stock._id, -10),
        updateStock(stock._id, -10)
    ];

    const results = await Promise.all(requests);

    const successfulUpdates = results.filter(res => res !== null);
    assert.strictEqual(successfulUpdates.length, 1);

    const finalStock = await Stock.findById(stock._id);
    assert.strictEqual(finalStock.quantity, 0);
});
