import express from 'express'
import {
    loginUser,
    logoutUser,
    registerUser,
    protect,
    admin,
    checkAuth,
} from '../../controllers/auth/authController.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/check-auth', protect, checkAuth)

export default router
