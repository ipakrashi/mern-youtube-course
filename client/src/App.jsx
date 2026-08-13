import { Route, Routes } from 'react-router-dom'
import AuthLayout from './components/auth/AuthLayout'
import AuthLogin from './pages/auth/Login'
import AuthRegister from './pages/auth/Register'
import AdminLayout from './components/admin-view/AdminLayout'
import AdminDashboard from './pages/admin-view/Dashboard'
import AdminOrders from './pages/admin-view/Orders'
import AdminProducts from './pages/admin-view/Products'
import AdminFeatures from './pages/admin-view/Features'
import ShoppingLayout from './components/shopping-view/ShoppingLayout'
import NotFound from './pages/not-found'
import ShoppingHome from './pages/shopping-view/Home'
import ShoppingListing from './pages/shopping-view/Listing'
import ShoppingCheckout from './pages/shopping-view/Checkout'
import ShoppingAccount from './pages/shopping-view/Account'
import CheckAuth from './components/common/CheckAuth'
import UnauthPage from './pages/unauth-page/index.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { checkAuth } from './store/auth-slice'

const App = () => {
    const { user, isAuthenticated, isLoading } = useSelector(
        (state) => state.authR,
    )
    const dispatch = useDispatch()

    // To check JWT Token everytime the page refreshes and redirect user to the correct page
    useEffect(() => {
        dispatch(checkAuth())
    }, [dispatch])

    if (isLoading) {
        return (
            <div className='flex h-screen w-full items-center justify-center'>
                <h1>Loading ...... </h1>
            </div>
        )
    }

    return (
        <div className='flex flex-col overflow-hidden bg-white'>
            {/* Common Component */}

            <Routes>
                {/* auth Routes */}
                <Route
                    path='/auth'
                    element={
                        <CheckAuth
                            isAuthenticated={isAuthenticated}
                            user={user}
                        >
                            <AuthLayout />
                        </CheckAuth>
                    }
                >
                    <Route path='login' element={<AuthLogin />} />
                    <Route path='register' element={<AuthRegister />} />
                </Route>
                {/* admin Routes */}
                <Route
                    path='/admin'
                    element={
                        <CheckAuth
                            isAuthenticated={isAuthenticated}
                            user={user}
                        >
                            <AdminLayout />
                        </CheckAuth>
                    }
                >
                    <Route path='dashboard' element={<AdminDashboard />} />
                    <Route path='orders' element={<AdminOrders />} />
                    <Route path='products' element={<AdminProducts />} />
                    <Route path='features' element={<AdminFeatures />} />
                </Route>
                {/* Shopping Routes */}
                <Route
                    path='/shop'
                    element={
                        <CheckAuth
                            isAuthenticated={isAuthenticated}
                            user={user}
                        >
                            <ShoppingLayout />
                        </CheckAuth>
                    }
                >
                    <Route path='home' element={<ShoppingHome />} />
                    <Route path='listing' element={<ShoppingListing />} />
                    <Route path='checkout' element={<ShoppingCheckout />} />
                    <Route path='account' element={<ShoppingAccount />} />
                </Route>
                {/* Not found  Route */}
                <Route
                    path='*'
                    element={
                        <CheckAuth
                            isAuthenticated={isAuthenticated}
                            user={user}
                        >
                            <NotFound />
                        </CheckAuth>
                    }
                />
                <Route path='/unauth-page' element={<UnauthPage />} />
            </Routes>
        </div>
    )
}

export default App
