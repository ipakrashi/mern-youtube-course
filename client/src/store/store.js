import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-slice/index.js'
import adminProductsReducer from './admin/product-slice/index.js'
import shoppingProductsReducer from './shop/product-slice/index.js'

const store = configureStore({
    reducer: {
        authR: authReducer,
        adminProductsR: adminProductsReducer,
        shoppingProductsR: shoppingProductsReducer,
    },
})

export default store
