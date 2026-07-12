import express from "express"
import { createUser, findByEmail } from "../services/userRepository.js"
import { User } from "../models/userModel.js"
import bcrypt from 'bcrypt'
import genarateToken from "../utils/token.js"

//signup
export async function signup(req, res) {
    try {
        const { name, email, password } = req.body
        const dupUser = await findByEmail(email)
        if (dupUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists"
            })
        }
        const hashPass = await bcrypt.hash(password, 10)

        const User = await createUser({
            name, email, password: hashPass
        })
        return res.status(201).json({
            message: "User Created",
            User: User
        })

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

//login
export async function login(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Required fields not found"
            })
        }
        const User = await findByEmail(email)
        const passMatch = await bcrypt.compare(password, User.password)

        if (!passMatch) {
            console.log("pass")
            return res.status(400).json({
                success: false,
                message: "Password is not matching"
            })
        }
        const token = genarateToken(User)
        return res.status(200).json({
            success: true,
            message: "Login successfull",
            User,
            token
        })
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


//admin login

export async function adminLogin(req,res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
           return  res.status(400).json({
                success: false,
                message: "Required fields not found"
            })
        }
        const User = await findByEmail(email)
        console.log(User)
        const passMatch = await bcrypt.compare(password, User.password)

        if (!passMatch) {
            return res.status(400).json({
                success: false,
                message: "Password is not matching"
            })
        }
        const token = genarateToken(User)

        return res.status(200).json({
            success: true,
            message: "Login successfull",
            User,
            token
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}




