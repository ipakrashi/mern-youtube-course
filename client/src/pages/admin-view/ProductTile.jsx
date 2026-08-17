import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

function AdminProductTile({
    product,
    setCurrentEditedId,
    setOpenCreateProductsDialogue,
    setFormData,
    handleDelete,
}) {
    return (
        <Card className='p-0 pb-2'>
            <div className='w-full max-w-sm mx-auto'>
                <div className='relative'>
                    <img
                        src={product?.image || null}
                        alt={product?.title || 'Product Image'}
                        className='w-full h-66 object-fit rounded-t-lg'
                    />
                </div>
                <CardContent>
                    <h2 className='text-xl font-bold mb-2 mt-2'>
                        {product?.title}
                    </h2>
                    <div className='flex justify-between items-center mb-2'>
                        <span
                            className={`${product.salePrice > 0 ? 'line-through' : ''} text-lg font-semibold text-primary`}
                        >
                            ${product.price}
                        </span>
                        {product.salePrice > 0 ? (
                            <span className='text-lg font-bold '>
                                ${product.salePrice}
                            </span>
                        ) : null}
                    </div>
                    <CardFooter className='flex justify-center items-center'>
                        <Button
                            onClick={() => {
                                setOpenCreateProductsDialogue(true)
                                setCurrentEditedId(product?._id)
                                setFormData(product)
                            }}
                            className='button-custom'
                        >
                            Edit
                        </Button>
                        <Button
                            className='button-custom'
                            onClick={() => handleDelete(product?._id)}
                        >
                            Delete
                        </Button>
                    </CardFooter>
                </CardContent>
            </div>
        </Card>
    )
}

export default AdminProductTile
