import mongoose from "mongoose";

const transferSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    fromStore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    toStore: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Store",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Transfer = mongoose.model("Transfer", transferSchema);

export default Transfer;