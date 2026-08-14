import asyncHandler from 'express-async-handler'
import { imageUploadUtil } from '../../helpers/cloudinary.js'
import productModel from '../../models/productModel.js'
import mongoose from 'mongoose'

// @desc  Upload Image to Cloudinary and get the Url
//  route   POST /api/admin/products/upload
//  @access admin
const handleImageUpload = asyncHandler(async (req, res) => {
    try {
        if (!req.file) {
            return res.json({
                success: false,
                message: 'No file provided',
            })
        }
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        // const url = 'data' + req.file.mimetype + ';base64' + b64
        const url = `data:${req.file.mimetype};base64,${b64}`
        const result = await imageUploadUtil(url)
        res.json({ success: true, result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Error Occurred' })
    }
})

// @desc   Fetch All Products
//  route   GET  /api/admin/products
//  @access  admin
const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
        const listOfProducts = await productModel.find({})
        res.status(200).json({ success: true, data: listOfProducts })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Error Occurred' })
    }
})

// @desc  Add A New Product
//  route  POST /api/admin/products/new
//  @access  admin
const addProduct = asyncHandler(async (req, res) => {
    try {
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        } = req.body
        const newlyCreatedProduct = new productModel({
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        })
        await newlyCreatedProduct.save()
        res.status(201).json({
            success: true,
            message: 'Product Created Successfully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, data: newlyCreatedProduct })
    }
})

// @desc  Edit a Product
//  route   PUT /api/admin/products/:id/edit
//  @access  admin
const editProduct = asyncHandler(async (req, res) => {
    try {
        const {
            image,
            title,
            description,
            category,
            brand,
            price,
            salePrice,
            totalStock,
        } = req.body
        const { id } = req.params

        const findProduct = await productModel.findById(id)

        if (!findProduct) {
            return res
                .status(404)
                .json({ success: false, message: 'Product Not Found' })
        }

        findProduct.image = findProduct.image
        findProduct.title = title || findProduct.title
        findProduct.description = description || findProduct.description
        findProduct.category = category || findProduct.category
        findProduct.brand = brand || findProduct.brand
        findProduct.price = price || findProduct.price
        findProduct.salePrice = salePrice || findProduct.salePrice
        findProduct.totalStock = totalStock || findProduct.totalStock

        await findProduct.save()

        res.status(200).json({ success: true, data: findProduct })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Error Occurred' })
    }
})

// @desc  Delete A Product
//  route  DELETE /api/admin/products/delete/:id
//  @access  admin
const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const { id } = req.params
        const deletedProduct = await productModel.findByIdAndDelete(id)
        res.status(200).json({ success: true, message: 'Product Deleted' })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Error Occurred' })
    }
})

export {
    handleImageUpload,
    fetchAllProducts,
    addProduct,
    editProduct,
    deleteProduct,
}
