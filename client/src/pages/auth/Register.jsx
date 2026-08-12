import CommonForm from '@/components/common/Form'
import { registerFormControls } from '@/config'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom' // Removed 'data' import
import { registerUser } from '@/store/auth-slice/index.js'
import { toast } from '@/components/ui/toast'

const initialState = {
    userName: '',
    email: '',
    password: '',
}

const AuthRegister = () => {
    const [formData, setFormData] = useState(initialState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function onSubmit(e) {
        e.preventDefault()

        // Chain .then() to receive the resolved action object from Redux
        dispatch(registerUser(formData))
        toast.add({
            title: 'Registration Successful',
        })

        navigate('/auth/login')
    }

    return (
        <div className='mx-auto w-full max-w-md space-y-6'>
            <div className='text-center'>
                <h1 className='text-3xl font-bold tracking-tight text-foreground'>
                    Create New Account
                </h1>
                <p className='mt-2'>
                    Already have an account
                    <Link
                        to='/auth/login'
                        className='font-medium text-primary hover:underline ml-2'
                    >
                        Login
                    </Link>
                </p>
            </div>
            <CommonForm
                formControls={registerFormControls}
                buttonText={'Sign Up'}
                formData={formData}
                setFormData={setFormData}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default AuthRegister
