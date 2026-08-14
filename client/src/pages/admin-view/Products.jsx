import ProductImageUpload from '@/components/admin-view/ImageUpload'
import CommonForm from '@/components/common/Form'
import { Button } from '@/components/ui/button'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet'
import { addProductFormElements } from '@/config'
import { useState } from 'react'

const initialFormData = {
    image: null,
    title: '',
    description: '',
    category: '',
    brand: '',
    price: '',
    salePrice: '',
    totalStock: '',
}

const AdminProducts = () => {
    const [openCreateProductsDialogue, setOpenCreateProductsDialogue] =
        useState(false)
    const [formData, setFormData] = useState(initialFormData)
    const [imageFile, setImageFile] = useState(null)
    const [uploadedImageUrl, setUploadedImageUrl] = useState('')

    function onSubmit(e) {
        e.preventDefault()
    }

    return (
        <>
            <div className='mb-5 w-full flex justify-end'>
                <Button
                    className='inline-flex gap-2 items-center rounded px-4 py-2 text-sm font-medium shadow'
                    onClick={() => setOpenCreateProductsDialogue(true)}
                >
                    Add New Product
                </Button>
            </div>
            <div className='grip gap-4 md:grid-cols-3 lg:grid-cols-4'>
                <Sheet
                    open={openCreateProductsDialogue}
                    onOpenChange={() => setOpenCreateProductsDialogue(false)}
                >
                    <SheetContent side='right' className='overflow-auto'>
                        <SheetHeader>
                            <SheetTitle>Add New Product</SheetTitle>
                        </SheetHeader>
                        <div className='p-6'>
                            <ProductImageUpload
                                imageFile={imageFile}
                                setImageFile={setImageFile}
                                uploadedImageUrl={uploadedImageUrl}
                                setUploadedImageUrl={setUploadedImageUrl}
                            />
                            <CommonForm
                                formControls={addProductFormElements}
                                formData={formData}
                                setFormData={setFormData}
                                buttonText='Add Product'
                                onSubmit={onSubmit}
                            />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </>
    )
}

export default AdminProducts
