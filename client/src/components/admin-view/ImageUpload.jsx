import { useEffect, useRef } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { UploadCloudIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'
import { Skeleton } from '../ui/skeleton'

function ProductImageUpload({
    imageFile,
    setImageFile,
    uploadedImageUrl,
    setUploadedImageUrl,
    imageLoadingState,
    setImageLoadingState,
    isEditMode,
}) {
    const inputRef = useRef(null)

    const handleImageFileChange = (e) => {
        const selectedFile = e.target.files?.[0]

        if (selectedFile) setImageFile(selectedFile)
    }

    const handleDragOver = (e) => {
        e.preventDefault()
        const draggedFile = e.dataTransfer.files?.[0]

        if (draggedFile) setImageFile(draggedFile)
    }
    const handleDrop = (e) => {
        e.preventDefault()
        const droppedFile = e.dataTransfer.files?.[0]

        if (droppedFile) setImageFile(droppedFile)
    }
    // Reset state and clear file input value
    const handleRemoveImage = () => {
        setImageFile(null)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }

    async function uploadImageToCloudinary() {
        setImageLoadingState(true)
        const data = new FormData()
        data.append('my_file', imageFile)
        const response = await axios.post(
            'http://localhost:5000/api/admin/products/upload-image',
            data,
        )

        if (response.data?.success) {
            setUploadedImageUrl(response.data.result.secure_url)
            setImageLoadingState(false)
        }
    }

    useEffect(() => {
        if (imageFile) {
            uploadImageToCloudinary()
        }
    }, [imageFile])

    return (
        <div className='w-full mx-auto max-w-md mt-4'>
            <Label className='text-lg mb-2 font-semibold block'>
                Upload Image
            </Label>
            <div
                className={` ${isEditMode ? 'opacity-20' : ''}border-2 border-dashed mb-3 rounded-lg p-4`}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <Input
                    id='image-upload'
                    type='file'
                    className='hidden'
                    ref={inputRef}
                    onChange={handleImageFileChange}
                    disabled={isEditMode}
                />
                {!imageFile ? (
                    <Label
                        htmlFor='image-upload'
                        className={`${isEditMode ? 'cursor-not-allowed' : ''} flex flex-col items-center justify-center h-32 cursor-pointer`}
                    >
                        <UploadCloudIcon className='w-10 h-10 text-muted-foreground mb-2' />
                        <span>Drag & Drop Or Click to Upload </span>
                    </Label>
                ) : imageLoadingState ? (
                    <Skeleton className='h-10 bg-gray-100' />
                ) : (
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                            {/* Thumbnail Preview */}
                            <img
                                src={URL.createObjectURL(imageFile)}
                                alt='Preview'
                                className='w-12 h-12 object-cover rounded-md border'
                            />
                            <p className='text-sm font-medium truncate max-w-45'>
                                {imageFile.name}
                            </p>
                        </div>
                        {/* Clear/Remove Button */}
                        <Button
                            type='button'
                            variant='ghost'
                            size='icon'
                            className='text-muted-foreground hover:text-foreground'
                            onClick={handleRemoveImage}
                        >
                            <XIcon className='w-5 h-5' />
                            <span className='sr-only'>Remove File</span>
                        </Button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProductImageUpload
