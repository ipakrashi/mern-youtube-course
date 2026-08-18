import ProductFilter from '@/components/shopping-view/ProductFilter'
import ShoppingProductTile from '@/components/shopping-view/ShoppingProductTile'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { sortOptions } from '@/config'
import { fetchAllFilteredProducts } from '@/store/shop/product-slice'
import { ArrowUpDownIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ShoppingListing = () => {
    const dispatch = useDispatch()
    const { productList } = useSelector((state) => state.shoppingProductsR)

    // fetch the list of products

    useEffect(() => {
        dispatch(fetchAllFilteredProducts())
    }, [dispatch])

    return (
        <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4  md:p-6 '>
            <div>
                <ProductFilter />
            </div>
            <div className='bg-background w-full rounded-lg shadow-sm'>
                <div className='p-4 border-b items-center flex justify-between'>
                    <h2 className='text-lg font-extrabold mr-2'>
                        All Products{' '}
                    </h2>
                    <div className='flex items-center gap-3'>
                        <span className='text-muted-foreground'>
                            {productList.length}{' '}
                            {`${productList.length}` > 0
                                ? 'Products'
                                : 'Product'}
                        </span>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant='outline'
                                    size='sm'
                                    className='flex items-center gap-1'
                                >
                                    <ArrowUpDownIcon className='h-4 w-4' />
                                    <span>Sort By:</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end' className='w-50'>
                                <DropdownMenuRadioGroup>
                                    {sortOptions.map((sortItem) => (
                                        <DropdownMenuRadioItem
                                            key={sortItem.id}
                                        >
                                            {sortItem.label}
                                        </DropdownMenuRadioItem>
                                    ))}
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 lg:grid-cols-3'>
                    {productList && productList.length > 0
                        ? productList.map((productItem) => (
                              <ShoppingProductTile
                                  key={productItem._id || productItem.id}
                                  product={productItem}
                              />
                          ))
                        : null}
                </div>
            </div>
        </div>
    )
}

export default ShoppingListing
