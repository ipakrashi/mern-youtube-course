import mongoose from 'mongoose'
const userSchema = mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'user',
        },
    },
    {
        timestamps: true,
    },
)
const userModel = mongoose.model('userModel', userSchema, 'users')
export default userModel
