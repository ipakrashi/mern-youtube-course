import asyncHandler from 'express-async-handler'
import { imageUploadUtil } from '../../helpers/cloudinary.js'

// @desc  Upload Image to Cloudinary and get the Url
//  route   POST /api/admin/upload
//  @access admin
const handleImageUpload = asyncHandler(async (req, res) => {
    try {
        if (!req.file) {
            return res.json({
                success: false,
                message: 'No file provided',
            })
        }
        const b64 = Buffer.from(req.file.buffer).toString('base64')
        // const url = 'data' + req.file.mimetype + ';base64' + b64
        const url = `data:${req.file.mimetype};base64,${b64}`
        const result = await imageUploadUtil(url)
        res.json({ success: true, result })
    } catch (error) {
        console.log(error)
        res.status(200).json({ success: false, message: 'Error Occurred' })
    }
})
export { handleImageUpload }
