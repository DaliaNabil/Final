'use client'

import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { handleRegister } from './register.actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { NextResponse } from 'next/server'


const schema = zod.object({
    name: zod.string().nonempty("Name is Required").min(3, "Min chars is 3").max(20, "Max chars is 20"),
    email: zod.string().nonempty("Email is Required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email"),
    password: zod.string().nonempty("Password is Required").regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/, "Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
    rePassword: zod.string().nonempty("Confirm Password is Required"),
    phone: zod.string().nonempty("Phone is Required").regex(/^01[0125][0-9]{8}$/, 'Enter Valid Phone')
}).refine((obj) => {
    return obj.password === obj.rePassword;
}, {
    error: "Confirm Password does not match Password",
    path: ['rePassword'],
});

export type RegisterFormType = zod.infer<typeof schema>

export default function RegisterForm() {
    const Rhfobj = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        resolver: zodResolver(schema)
    })
    const { control, handleSubmit } = Rhfobj

    async function mySubmit(data: RegisterFormType) {
        
        const resOutPut = await handleRegister(data)

        if(resOutPut !== true){
         
            toast.error(resOutPut as string, {position:'top-right', duration: 3000})
        }
    }

    return (
        <Form {...Rhfobj} >
            <form onSubmit={handleSubmit(mySubmit)} >
                <FormField
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-main p-2'>Username:</FormLabel>
                            <FormControl>
                                <Input {...field} className='rounded-2xl pt-2-' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-main p-2'>Email:</FormLabel>
                            <FormControl>
                                <Input {...field} type='email' className='rounded-2xl pt-2-' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-main p-2'>Password:</FormLabel>
                            <FormControl>
                                <Input {...field} type='password' className='rounded-2xl pt-2-' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="rePassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-main p-2'>Confirm Password:</FormLabel>
                            <FormControl>
                                <Input {...field} type='password' className='rounded-2xl pt-2-' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-main p-2'>User Phone:</FormLabel>
                            <FormControl>
                                <Input {...field} type='tel' className='rounded-2xl pt-2-' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='pt-9'>
                    <Button className='bg-main w-full rounded-3xl p-5' type='submit'>Register</Button>
                </div>
            </form>
        </Form>
    )
}