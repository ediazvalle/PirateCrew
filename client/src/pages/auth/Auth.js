import React from 'react'
import { Login } from './Login'
import { Signup } from './Signup'

const Auth = () => {
    return (
        <div className='row'>
            <div className='col-lg-6'>
                <Signup />
            </div>
            <div className='col-lg-6'>
                <Login />
            </div>

        </div>
    )
}

export default Auth
