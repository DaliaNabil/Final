

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import RegisterForm from './RegisterForm'
export default function Register() {

// // 
//     "name": "Ahmed Abd Al-Muti",
//     "email":"ahmedmuttii4012@gmail.com",
//     "password":"Ahmed@123",
//     "rePassword":"Ahmed@123",
//     "phone":"01010700701"
// }


  return (
    <div className='w-1/2 mx-auto shadow-2xl p-15'>
     <h1 className=' font-bold text-4xl pb-5 text-center'> Became a Fresh-Cart User</h1>
<RegisterForm  />
    </div>
  )
}
