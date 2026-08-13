import bcrypt from 'bcryptjs'
import asyncHandler from 'express-async-handler'
import userModel from '../../models/userModel.js'
import jwt from 'jsonwebtoken'

// @desc      TO LOGIN AN USER
//  route       POST '/login'
//  @access  PUBLIC
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    try {
        // Check if the user Exists
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User doesn't exist! Please register first.",
            })
        }

        // Validate Password
        const matchPassword = await bcrypt.compare(password, user.password)
        if (!matchPassword) {
            return res.status(400).json({
                success: false,
                message: 'Invalid password! Please try again.',
            })
        }

        // Passwords Matched Generate JWT
        const token = await jwt.sign(
            {
                id: user._id,
                role: user.role,
                email: user.email,
            },
            'CLIENT_SECRET_KEY',
            { expiresIn: '60m' },
        )
        // 4. Set Cookie and Return User Data
        res.cookie('token', token, { httpOnly: true, secure: false })
            .status(200)
            .json({ success: true, message: 'User Logged In', user })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Some Error Occurred',
        })
    }
})

// @desc      TO REGISTER AN USER
//  route       POST '/register'
//  @access  PUBLIC
const registerUser = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body

    try {
        const checkUser = await userModel.findOne({ email })
        if (!checkUser) {
            const hashedPassword = await bcrypt.hash(password, 12)
            const newUser = new userModel({
                userName,
                email,
                password: hashedPassword,
            })
            await newUser.save()
            res.status(201).json({
                success: true,
                message: 'Registration successful!',
            })
        } else {
            return res
                .status(500)
                .json({ success: false, message: 'User Already Exists' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Some Error Occurred' })
    }
})

// @desc      TO LOGOUT AN USER
//  route       POST '/logout'
//  @access  PUBLIC
const logoutUser = asyncHandler(async (req, res) => {
    try {
        // 1. Clear Cookie
        res.clearCookie('token')
            .status(200)
            .json({ success: true, message: 'User Logged Out' })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Some Error Occurred',
        })
    }
})

// CHECK-AUTH - PROTECT FUNCTION

const checkAuth = asyncHandler(async (req, res) => {
    const user = req.user

    res.status(200).json({ success: true, message: 'Authenticated User', user })
})

// Auth Middleware
const protect = asyncHandler(async (req, res, next) => {
    let token

    // READ THE JWT FROM COOKIE
    token = req.cookies.token
    if (token) {
        try {
            const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY')
            // Ensure decoded key matches what you signed (userId or id)
            req.user = await userModel
                .findById(decoded.userId || decoded.id)
                .select('-password')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('Not Authorized, Invalid Token')
        }
    } else {
        res.status(401)
        throw new Error('Not Authorized, No Token')
    }
})

// ADMIN MIDDLEWARE
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next()
    } else {
        res.status(401)
        throw new Error('Not Authorized as Admin')
    }
}

export { registerUser, loginUser, logoutUser, protect, admin, checkAuth }
