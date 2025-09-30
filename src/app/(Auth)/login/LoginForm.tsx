'use client'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'; // This is the correct import for client-side forms
import Link from 'next/link'

const schema = zod.object({
    email: zod.string().nonempty("Email is Required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email"),
    password: zod.string().nonempty("Password is Required").regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/, "Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
});

export type LoginFormType = zod.infer<typeof schema>

export default function LoginForm() {
    const router = useRouter()
    const Rhfobj = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(schema)
    });

    const { control, handleSubmit } = Rhfobj;

    async function mySubmit(data: LoginFormType) {
        
        const res = await signIn('credentials', { 
            email: data.email, 
            password: data.password, 
            redirect: false,
        });
        
        if (res?.error) {
           
            toast.error("Incorrect email or password.", { position: 'top-right', duration: 3000 });
        } else {
            
            toast.success('Welcome back!', { position: 'top-center', duration: 3000 });
            router.push('/');
        }
    }

    return (
        <Form {...Rhfobj} >
            <form onSubmit={handleSubmit(mySubmit)} >
                <FormField
                    control={control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className='text-main p-2' > Email :  </FormLabel>
                            <FormControl>
                                <Input {...field} type='email' className=' rounded-2xl pt-2-' />
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
                            <FormLabel className='text-main p-2' > Password :  </FormLabel>
                            <FormControl>
                                <Input {...field} type='password' className=' rounded-2xl pt-2-' />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className='pt-9 '>
                    <Button className='bg-main w-full rounded-3xl p-5' type='submit'>Log In</Button>
     {/* <div className="mt-8 text-center">
                <a 
                    className='text-blue-600 dark:text-blue-400 font-medium underline text-center p-2 inline-block hover:text-blue-800 dark:hover:text-blue-300 transition' 
                    href='/forgetPassword'
                >
                    Forget Password
                </a>
            </div> */}
                </div>
            </form>
        </Form>
    )
}