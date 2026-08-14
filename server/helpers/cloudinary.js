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

const upload = multer({ storage })

export { upload, imageUploadUtil }
