import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth-slice/index.js'

const store = configureStore({
    reducer: {
        authR: authReducer,
    },
})

export default store
