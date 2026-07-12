import mongoose from "mongoose";
import { type } from "node:os";

 const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["admin", "Shopper"],
        default: "Shopper",
    },
},
    {
        timestamps: true,
    }
)

export const User = mongoose.model("User", userSchema);
