import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const BASE_URL = 'http://localhost:5000/api'

const initialState = {
    isLoading: false,
    productList: [],
}
// 1. Add New Products
export const AddNewProduct = createAsyncThunk(
    '/products/addNewProduct',
    async (formData) => {
        const result = await axios.post(
            `${BASE_URL}/admin/products/add`,
            formData,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )
        return result?.data
    },
)
// 2. Fetch All Products
export const fetchAllProducts = createAsyncThunk(
    '/adminProducts/fetchAllProducts',
    async () => {
        const result = await axios.get(`${BASE_URL}/admin/products/get`, {
            withCredentials: true,
        })
        return result?.data
    },
)

// 3. Edit Product
export const editProduct = createAsyncThunk(
    '/adminProducts/editProduct',
    async ({ id, formData }) => {
        const result = await axios.put(
            `${BASE_URL}/admin/products/edit/${id}`,
            formData,
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            },
        )
        return result?.data
    },
)

// 4. Delete Product
export const deleteProduct = createAsyncThunk(
    '/adminProducts/deleteProduct',
    async (id) => {
        const result = await axios.delete(
            `${BASE_URL}/admin/products/delete/${id}`,
            {
                withCredentials: true,
            },
        )
        return result?.data
    },
)

const AdminProductsSlice = createSlice({
    name: 'adminProducts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddNewProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(AddNewProduct.fulfilled, (state, action) => {
                state.isLoading = false
                state.productList = action.payload.data
            })
            .addCase(AddNewProduct.rejected, (state) => {
                state.isLoading = false
                state.productList = []
            }) // Fetch All Products
            .addCase(fetchAllProducts.pending, (state) => {
                state.isLoading = true
            })
            .addCase(fetchAllProducts.fulfilled, (state, action) => {
                state.isLoading = false
                state.productList = action.payload.data
            })
            .addCase(fetchAllProducts.rejected, (state) => {
                state.isLoading = false
                state.productList = []
            }) // --- EDIT PRODUCT ---
            .addCase(editProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(editProduct.fulfilled, (state, action) => {
                state.isLoading = false
                // Find and update product locally in array
                const index = state.productList.findIndex(
                    (item) => item._id === action.payload.data?._id,
                )
                if (index !== -1) {
                    state.productList[index] = action.payload.data
                }
            })
            .addCase(editProduct.rejected, (state) => {
                state.isLoading = false
            })

            // --- DELETE PRODUCT ---
            .addCase(deleteProduct.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                state.isLoading = false
                // Filter out deleted product using returned ID
                state.productList = state.productList.filter(
                    (item) => item._id !== action.meta.arg, // action.meta.arg contains passed ID
                )
            })
            .addCase(deleteProduct.rejected, (state) => {
                state.isLoading = false
            })
    },
})

export default AdminProductsSlice.reducer
