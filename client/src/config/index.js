import { LayoutDashboard, ListOrderedIcon, PackageSearch } from 'lucide-react'

export const registerFormControls = [
    {
        name: 'userName',
        label: 'User Name',
        placeholder: 'Enter your User Name',
        componentType: 'input',
        type: 'text',
    },
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your Email',
        componentType: 'input',
        type: 'text',
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password',
    },
]
export const loginFormControls = [
    {
        name: 'email',
        label: 'Email',
        placeholder: 'Enter your Email',
        componentType: 'input',
        type: 'text',
    },
    {
        name: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        componentType: 'input',
        type: 'password',
    },
]

export const adminSideBarMenuItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: LayoutDashboard,
    },
    {
        id: 'products',
        label: 'Products',
        path: '/admin/products',
        icon: PackageSearch,
    },
    {
        id: 'orders',
        label: 'Orders',
        path: '/admin/orders',
        icon: ListOrderedIcon,
    },
]
