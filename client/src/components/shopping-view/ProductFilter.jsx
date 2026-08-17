import { filterOptions } from '@/config'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'

const ProductFilter = () => {
    return (
        <div className='bg-background rounded-lg shadow-sm'>
            <div className='p-4 border-b'>
                <h2 className='text-lg font-extrabold'>Filters</h2>
            </div>
            <div className='p-4 space-y-4'>
                {Object.keys(filterOptions).map((keyItem) => (
                    <>
                        <div>
                            <h3 className='text-base font-bold'>{keyItem}</h3>
                            <div className='gap-2 grid mt-2'>
                                {filterOptions[keyItem].map((option) => (
                                    <Label
                                        className='flex items-center gap-2 font-medium'
                                        key={option.id}
                                    >
                                        <Checkbox />
                                        {option.label}
                                    </Label>
                                ))}
                            </div>
                        </div>
                        <Separator />
                    </>
                ))}
            </div>
        </div>
    )
}

export default ProductFilter
