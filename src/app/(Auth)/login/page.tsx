import React from 'react'
import LoginForm from './LoginForm'

export default function Login() {
  return (
   <div className='w-1/2 mx-auto shadow-2xl p-15'>
        <h1 className=' font-bold text-4xl pb-5 text-center text-red-900'> Log IN  Your Fresh-Cart </h1>
   <LoginForm  />
       </div>
  )
}
