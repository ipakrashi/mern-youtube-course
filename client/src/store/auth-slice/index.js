import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
const BASE_URL = 'http://localhost:5000/api'

const initialState = {
    isAuthenticated: false,
    isLoading: true,
    user: null,
}

export const registerUser = createAsyncThunk(
    '/auth/register',
    async (formData) => {
        const response = await axios.post(
            `${BASE_URL}/auth/register`,
            formData,
            {
                withCredentials: true,
            },
        )
        return response.data
    },
)

export const loginUser = createAsyncThunk('/auth/login', async (formData) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, formData, {
        withCredentials: true,
    })
    return response.data
})

export const checkAuth = createAsyncThunk('/auth/checkAuth', async () => {
    const response = await axios.get(`${BASE_URL}/auth/check-auth`, {
        withCredentials: true,
        headers: {
            'Cache-Control':
                'no-store,no-cache,must-revalidate,proxy-revalidate',
            Expires: 0,
        },
    })
    return response.data
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser: (state, action) => {},
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
                state.isAuthenticated = false
            })
            .addCase(registerUser.rejected, (state) => {
                state.isLoading = false
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload?.user || null // Extracts only { _id, userName, email, role }
                state.isAuthenticated = action.payload?.success || false
            })
            .addCase(loginUser.rejected, (state) => {
                state.isLoading = false
                state.user = null
                state.isAuthenticated = false
            })
            .addCase(checkAuth.pending, (state) => {
                state.isLoading = true
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload?.user || null // Extracts only { _id, userName, email, role }
                state.isAuthenticated = action.payload?.success || false
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isLoading = false
                state.user = null
                state.isAuthenticated = false
            })
    },
})

export const { setUser } = authSlice.actions

export default authSlice.reducer
