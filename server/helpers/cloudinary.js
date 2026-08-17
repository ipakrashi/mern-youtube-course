import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'

// Configuration
cloudinary.config({
    cloud_name: 'zkffjn4a',
    api_key: '783334774878229',
    api_secret: '1whaWLp5YzedtseZHOJlivC9DfE',
    api_environment_variable:
        'CLOUDINARY_URL=cloudinary://783334774878229:1whaWLp5YzedtseZHOJlivC9DfE@zkffjn4a',
})

const storage = new multer.memoryStorage()

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type: 'auto',
    })

    return result
}

// Extracts the public_id from a Cloudinary URL (handles folders & version strings)
function getPublicIdFromUrl(url) {
    if (!url || typeof url !== 'string') return null
    const parts = url.split('/upload/')
    if (parts.length < 2) return null

    let path = parts[1]
    // Strip version prefix if present (e.g., v12345678/)
    path = path.replace(/^v\d+\//, '')
    // Strip file extension
    const lastDotIndex = path.lastIndexOf('.')
    if (lastDotIndex !== -1) {
        path = path.substring(0, lastDotIndex)
    }
    return path
}

async function imageDeleteUtil(imageUrl) {
    try {
        const publicId = getPublicIdFromUrl(imageUrl)
        if (!publicId) return null

        const result = await cloudinary.uploader.destroy(publicId)
        return result
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error)
        throw error
    }
}

const upload = multer({ storage })

export { upload, imageUploadUtil, imageDeleteUtil }
