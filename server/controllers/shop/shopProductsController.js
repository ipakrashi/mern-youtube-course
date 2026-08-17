import asyncHandler from 'express-async-handler'
import productModel from '../../models/productModel.js'

// @desc    Get filtered products
// @route   GET /api/shop/products/get
// @access  Public
const getFilteredProducts = asyncHandler(async (req, res) => {
    try {
        const products = await productModel.find({})
        res.status(200).json({ success: true, data: products })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Some Error Occurred' })
    }
})
export { getFilteredProducts }
