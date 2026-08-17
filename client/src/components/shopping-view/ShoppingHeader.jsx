import { HousePlug, LogOut, Menu, ShoppingCart, UserCheck } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import { Button } from '../ui/button'
import { shoppingViewHeaderMenuItems } from '@/config'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { logoutUser } from '@/store/auth-slice'

function HeaderRightContent() {
    const { user } = useSelector((state) => state.authR)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logoutUser()).then((action) => {
            if (action?.payload?.success) {
                navigate('/auth/login')
            }
        })
    }

    return (
        <div className='flex lg:items-center lg:flex-row gap-4 flex-col'>
            <Button variant='outline' size='icon'>
                <ShoppingCart className='w-6 h-6' />
                <span className='sr-only'>Cart</span>
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Avatar className='bg-black cursor-pointer'>
                        <AvatarFallback className='bg-black text-white font-extrabold'>
                            {user?.userName?.[0]?.toUpperCase() || 'U'}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent side='bottom' align='end' className='w-56'>
                    <DropdownMenuGroup>
                        <DropdownMenuLabel>
                            Logged In As : {user?.userName}
                        </DropdownMenuLabel>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => navigate('/shop/account')}
                        className='cursor-pointer'
                    >
                        <UserCheck className='mr-2 h-4 w-4' />
                        Account
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={handleLogout}
                        className='cursor-pointer'
                    >
                        <LogOut className='mr-2 h-4 w-4' />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

function MenuItems() {
    return (
        <nav className='flex flex-col mb-3 lg:mb-0 items-center gap-6 lg:flex-row'>
            {shoppingViewHeaderMenuItems.map((menuItem) => (
                <Link
                    key={menuItem.id}
                    to={menuItem.path}
                    className='text-sm font-medium'
                >
                    {menuItem.label}
                </Link>
            ))}
        </nav>
    )
}

const ShoppingHeader = () => {
    const { isAuthenticated } = useSelector((state) => state.authR)

    return (
        <header className='sticky top-0 z-40 border-b bg-background'>
            <div className='flex h-16 items-center justify-between px-4 md:px-6'>
                <Link to='/shop/home' className='flex gap-2 items-center'>
                    <HousePlug className='h-6 w-6' />
                    <span className='font-bold'>Ecommerce</span>
                </Link>
                <Sheet>
                    <SheetTrigger asChild>
                        <Button
                            variant='outline'
                            size='icon'
                            className='lg:hidden'
                        >
                            <Menu className='h-6 w-6' />
                            <span className='sr-only'>Toggle Header Menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side='left' className='w-full max-w-xs pt-16'>
                        <MenuItems />
                        <div className='mt-6 border-t pt-4'>
                            <HeaderRightContent />
                        </div>
                    </SheetContent>
                </Sheet>
                <div className='hidden lg:block'>
                    <MenuItems />
                </div>
                {isAuthenticated ? (
                    <div className='hidden lg:block'>
                        <HeaderRightContent />
                    </div>
                ) : null}
            </div>
        </header>
    )
}

export default ShoppingHeader
