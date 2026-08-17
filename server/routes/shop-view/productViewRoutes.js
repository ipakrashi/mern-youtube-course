import express from 'express'
import { getFilteredProducts } from '../../controllers/shop/shopProductsController.js'

const router = express.Router()

router.get('/get', getFilteredProducts)

export default router
