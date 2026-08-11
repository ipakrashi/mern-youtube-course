import { Outlet } from 'react-router-dom'
import ShoppingHeader from './ShoppingHeader'

const ShoppingLayout = () => {
    return (
        <div className='flex flex-col bg-white overflow-hidden'>
            {/* Common Header Component of Shopping View */}
            <ShoppingHeader />
            <main className='flex w-full flex-col'>
                <Outlet />
            </main>
        </div>
    )
}

export default ShoppingLayout
