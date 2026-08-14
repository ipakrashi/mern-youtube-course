import dotenv from 'dotenv/config'
import express from 'express'
import dns from 'dns'
import mongoose from 'mongoose'
import connectDB from '../server/db/dbConnect.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './routes/auth/authRoutes.js'
import adminProductRouter from './routes/admin/productRoutes.js'
dns.setServers(['8.8.8.8', '8.8.4.4'])
const app = express()
const PORT = process.env.PORT || 3000

//Connection to Database
connectDB()

// Middleware
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Cache-Control',
            'Expires',
            'Pragma',
        ],
        credentials: true,
    }),
)
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/admin/products', adminProductRouter)

// Custom Error Handlers

// Server Start
app.listen(PORT, () => {
    console.log(`Server Started On Port : ${PORT}`)
})
