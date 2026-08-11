import { Navigate, useLocation } from 'react-router-dom'

const CheckAuth = ({ isAuthenticated, user, children }) => {
    const location = useLocation()

    // 1. Unauthenticated users trying to access protected routes
    if (
        !isAuthenticated &&
        !(
            location.pathname.includes('/login') ||
            location.pathname.includes('/register')
        )
    ) {
        return <Navigate to='/auth/login' />
    }

    // 2. Authenticated users trying to access login or register pages
    if (
        isAuthenticated &&
        (location.pathname.includes('/login') ||
            location.pathname.includes('/register'))
    ) {
        if (user?.role === 'admin') {
            return <Navigate to='/admin/dashboard' />
        } else {
            return <Navigate to='/shop/home' />
        }
    }

    // 3. Non-admin users trying to access admin routes
    if (
        isAuthenticated &&
        user?.role !== 'admin' &&
        location.pathname.includes('/admin')
    ) {
        return <Navigate to='/unauth-page' />
    }

    // 4. Admin users trying to access customer shop routes
    if (
        isAuthenticated &&
        user?.role === 'admin' &&
        location.pathname.includes('/shop')
    ) {
        return <Navigate to='/admin/dashboard' />
    }

    return <>{children}</>
}

export default CheckAuth
