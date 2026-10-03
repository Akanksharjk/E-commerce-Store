import userModel from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body

        const userExists = await userModel.findOne({ email })
        if (userExists) {
            return res.status(400).json({
                message: 'User already exists'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await userModel.create({ name, email, password: hashedPassword })

        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        })
    }
}
export const loginUser = async (req, res) => {
    try {
        let { email, password } = req.body

        let user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: 'Invalid credentials'
            })
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            })
        }
        let token = jwt.sing(
            {
                id: user._id,
                email: user.email
            },
            process.env.jwt_SECRET,
            { expiresIn: '7d' }
        )
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        })
    }
}
