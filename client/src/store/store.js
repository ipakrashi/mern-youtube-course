import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-slice/index.js'
import adminProductsReducer from './admin/product-slice/index.js'
const store = configureStore({
    reducer: {
        authR: authReducer,
        adminProductsR: adminProductsReducer,
    },
})

export default store
