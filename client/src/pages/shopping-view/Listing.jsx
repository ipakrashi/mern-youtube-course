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
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ShoppingListing = () => {
    const dispatch = useDispatch()
    const { productList } = useSelector((state) => state.shoppingProductsR)
    const [filters, setFilters] = useState({})
    const [sort, setSort] = useState(null)

    // fetch the list of products
    useEffect(() => {
        dispatch(fetchAllFilteredProducts())
    }, [dispatch])

    function handleSort(value) {
        console.log(value)
        setSort(value)
    }

    // Fixed Immutability and State Update
    function handleFilter(getSectionId, getCurrentOption) {
        let copyFilters = { ...filters }

        // Ensure array exists for section
        if (!copyFilters[getSectionId]) {
            copyFilters[getSectionId] = [getCurrentOption]
        } else {
            const indexOfCurrentOption =
                copyFilters[getSectionId].indexOf(getCurrentOption)

            if (indexOfCurrentOption === -1) {
                // Return a fresh array copy instead of mutably pushing
                copyFilters[getSectionId] = [
                    ...copyFilters[getSectionId],
                    getCurrentOption,
                ]
            } else {
                // Return a filtered array copy instead of mutably splicing
                copyFilters[getSectionId] = copyFilters[getSectionId].filter(
                    (item) => item !== getCurrentOption,
                )
            }
        }

        // 1. Update React Local State (Triggers re-render immediately)
        setFilters(copyFilters)

        // 2. Persist to Session Storage
        sessionStorage.setItem('filters', JSON.stringify(copyFilters))
    }

    // Restore filter options on page load safely
    useEffect(() => {
        const savedFilters = JSON.parse(sessionStorage.getItem('filters'))
        if (savedFilters) {
            setFilters(savedFilters)
        }
    }, [])
    return (
        <div className='grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4  md:p-6 '>
            <div>
                <ProductFilter filters={filters} handleFilter={handleFilter} />
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
                                <DropdownMenuRadioGroup
                                    value={sort}
                                    onValueChange={handleSort}
                                >
                                    {sortOptions.map((sortItem) => (
                                        <DropdownMenuRadioItem
                                            key={sortItem.id}
                                            value={sortItem.id}
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
