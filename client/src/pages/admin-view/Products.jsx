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
import { AddNewProduct, fetchAllProducts } from '@/store/admin/product-slice'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from '@/components/ui/toast'
import AdminProductTile from './ProductTile'

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
    const [imageLoadingState, setImageLoadingState] = useState(false)
    const { productList } = useSelector((state) => state.adminProductsR)
    const dispatch = useDispatch()

    // ✅ Sync Cloudinary URL into formData.image whenever upload succeeds
    useEffect(() => {
        if (uploadedImageUrl) {
            setFormData((prev) => ({
                ...prev,
                image: uploadedImageUrl,
            }))
        }
    }, [uploadedImageUrl])

    useEffect(() => {
        dispatch(fetchAllProducts())
    }, [dispatch])

    function onSubmit(e) {
        e.preventDefault()
        dispatch(AddNewProduct({ ...formData, image: uploadedImageUrl })).then(
            (data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts())
                    setImageFile(null)
                    setFormData(initialFormData)
                    setOpenCreateProductsDialogue(false)
                    toast.add({
                        title: 'Product Added Sucessfully ',
                    })
                }
            },
        )
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
            {/* Product List  */}
            <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
                {productList && productList.length > 0
                    ? productList.map((productItem) => (
                          <AdminProductTile product={productItem} />
                      ))
                    : null}
            </div>
            <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
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
                                setImageLoadingState={setImageLoadingState}
                                imageLoadingState={imageLoadingState}
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
