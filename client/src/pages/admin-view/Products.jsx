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
import {
    AddNewProduct,
    deleteProduct,
    editProduct,
    fetchAllProducts,
} from '@/store/admin/product-slice'
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
    const [currentEditedId, setCurrentEditedId] = useState(null)
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

        if (currentEditedId !== null) {
            dispatch(editProduct({ id: currentEditedId, formData })).then(
                (data) => {
                    if (data?.payload?.success) {
                        dispatch(fetchAllProducts())
                        setFormData(initialFormData)
                        setOpenCreateProductsDialogue(false)
                        setCurrentEditedId(null)
                        toast.add({ title: 'Product Updated Successfully' })
                    }
                },
            )
        } else {
            dispatch(
                AddNewProduct({ ...formData, image: uploadedImageUrl }),
            ).then((data) => {
                if (data?.payload?.success) {
                    dispatch(fetchAllProducts())
                    setImageFile(null)
                    setFormData(initialFormData)
                    setOpenCreateProductsDialogue(false)
                    toast.add({
                        title: 'Product Added Sucessfully ',
                    })
                }
            })
        }
    }

    function isFormValid() {
        return Object.keys(formData)
            .map((key) => formData[key] !== '')
            .every((item) => item)
    }

    function handleDelete(getCurrentProductId) {
        console.log(getCurrentProductId)
        dispatch(deleteProduct(getCurrentProductId)).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllProducts())
            }
        })
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
                          <AdminProductTile
                              key={productItem._id}
                              product={productItem}
                              setCurrentEditedId={setCurrentEditedId}
                              setOpenCreateProductsDialogue={
                                  setOpenCreateProductsDialogue
                              }
                              setFormData={setFormData}
                              handleDelete={handleDelete}
                          />
                      ))
                    : null}
            </div>
            <div className='grid gap-4 md:grid-cols-3 lg:grid-cols-4'>
                <Sheet
                    open={openCreateProductsDialogue}
                    onOpenChange={() => {
                        setOpenCreateProductsDialogue(false)
                        setCurrentEditedId(null)
                        setFormData(initialFormData)
                    }}
                >
                    <SheetContent side='right' className='overflow-auto'>
                        <SheetHeader>
                            <SheetTitle>
                                {!currentEditedId
                                    ? 'Add New Product'
                                    : `Edit Product - ${currentEditedId}`}
                            </SheetTitle>
                        </SheetHeader>
                        <div className='p-6'>
                            <ProductImageUpload
                                imageFile={imageFile}
                                setImageFile={setImageFile}
                                uploadedImageUrl={uploadedImageUrl}
                                setUploadedImageUrl={setUploadedImageUrl}
                                setImageLoadingState={setImageLoadingState}
                                imageLoadingState={imageLoadingState}
                                isEditMode={currentEditedId !== null}
                            />
                            <CommonForm
                                formControls={addProductFormElements}
                                formData={formData}
                                setFormData={setFormData}
                                buttonText={
                                    !currentEditedId
                                        ? 'Add Product'
                                        : 'Edit Product'
                                }
                                placeholder={
                                    currentEditedId
                                        ? 'Enter Sale Price or 0'
                                        : ''
                                }
                                isBtnDisabled={!isFormValid()}
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
