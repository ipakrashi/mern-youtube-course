import CommonForm from '@/components/common/Form'
import { loginFormControls } from '@/config'
import { loginUser } from '@/store/auth-slice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

const initialState = {
    email: '',
    password: '',
}

const AuthLogin = () => {
    const [formData, setFormData] = useState(initialState)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function onSubmit(event) {
        event.preventDefault()
        dispatch(loginUser(formData)).then((data) => {
            if (data?.payload?.success) {
                // Optional: Redirect immediately based on user role
                const role = data.payload.user?.role
                if (role === 'admin') {
                    navigate('/admin/dashboard')
                } else {
                    navigate('/shop/home')
                }
            }
        })
    }

    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold tracking-tight text-foreground'>
                    Sign In To Your Account
                </h1>
                <p className='mt-2'>
                    Don't have an account
                    <Link
                        to='/auth/register'
                        className='font-medium text-primary hover:underline ml-2'
                    >
                        Register
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={loginFormControls}
                buttonText={'Sign In'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default AuthLogin
