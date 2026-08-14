import { adminSideBarMenuItems } from '@/config'
import { UserShield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'

function MenuItems({ setOpen }) {
    const navigate = useNavigate()

    return (
        <nav className='mt-8 flex-col flex gap-2 '>
            {adminSideBarMenuItems.map((menuItem) => {
                let IconComponent = menuItem.icon
                return (
                    <div
                        className='flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover: bg-muted hover:text-foreground text-xl cursor-pointer'
                        key={menuItem.label}
                        onClick={() => {
                            navigate(menuItem.path)
                            setOpen ? setOpen(false) : null
                        }}
                    >
                        <IconComponent />
                        <span className='text-medium font-medium'>
                            {' '}
                            {menuItem.label}
                        </span>
                    </div>
                )
            })}
        </nav>
    )
}

const AdminSideBar = ({ open, setOpen }) => {
    const navigate = useNavigate()
    return (
        <>
            {/* Mobile Menu */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side='left' className='w-64'>
                    <div className='flex flex-col h-full'>
                        <SheetHeader className='border-b'>
                            <SheetTitle className='flex gap-2 my-2'>
                                <UserShield size={30} className='mr-2' />
                                <span className='text-2xl font-extrabold'>
                                    Admin Panel
                                </span>
                            </SheetTitle>
                        </SheetHeader>
                        <MenuItems setOpen={setOpen} />
                    </div>
                </SheetContent>
            </Sheet>

            {/* Large Screen SideBar */}
            <aside className='hidden w-64 flex-col border-r bg-background p-6 lg:flex'>
                <div
                    className='flex items-center gap-2 cursor-pointer'
                    onClick={() => navigate('/admin/dashboard')}
                >
                    <UserShield size={30} />
                    <span className='text-2xl font-extrabold'>Admin Panel</span>
                </div>
                <MenuItems />
            </aside>
        </>
    )
}

export default AdminSideBar
