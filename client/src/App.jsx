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

const App = () => {
    return (
        <div className='flex flex-col overflow-hidden bg-white'>
            {/* Common Component */}
            <Routes>
                {/* auth Routes */}
                <Route path='/auth' element={<AuthLayout />}>
                    <Route path='login' element={<AuthLogin />} />
                    <Route path='register' element={<AuthRegister />} />
                </Route>
                {/* admin Routes */}
                <Route path='/admin' element={<AdminLayout />}>
                    <Route path='dashboard' element={<AdminDashboard />} />
                    <Route path='orders' element={<AdminOrders />} />
                    <Route path='products' element={<AdminProducts />} />
                    <Route path='features' element={<AdminFeatures />} />
                </Route>
                {/* Shopping Routes */}
                <Route path='/shop' element={<ShoppingLayout />}>
                    <Route path='home' element={<ShoppingHome />} />
                    <Route path='listing' element={<ShoppingListing />} />
                    <Route path='checkout' element={<ShoppingCheckout />} />
                    <Route path='account' element={<ShoppingAccount />} />
                </Route>
                {/* Not found  Route */}
                <Route path='*' element={<NotFound />}></Route>
            </Routes>
        </div>
    )
}

export default App
