import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import userModel from '../../models/userModel.js'

// @desc      TO LOGIN AN USER
//  route       POST '/login'
//  @access  PUBLIC
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    try {
        res.status(200).json()
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Some Error Occurred' })
    }
})

// @desc      TO REGISTER AN USER
//  route       POST '/register'
//  @access  PUBLIC
const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body

    try {
        const hashedPassword = await bcrypt.hash(password, 12)
        const newUser = new userModel({
            userName,
            email,
            password: hashedPassword,
        })
        await newUser.save()
        res.status(201).json(newUser)
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Some Error Occurred' })
    }
})
export { registerUser, login }
