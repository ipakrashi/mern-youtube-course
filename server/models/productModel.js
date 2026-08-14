import mongoose from 'mongoose'
const productSchema = mongoose.Schema(
    {
        image: String,
        title: String,
        description: String,
        category: String,
        brand: String,
        price: Number,
        salePrice: Number,
        totalStock: Number,
    },
    {
        timestamps: true,
    },
)
const productModel = mongoose.model('productModel', productSchema, 'products')
export default productModel
