// 'use client'
// import { Button } from '@/components/ui/button'
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import React from 'react'
// import { useForm } from 'react-hook-form'
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from 'zod'
// import { toast, Toaster } from 'sonner'
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'


// export default function forgetPassword() {
//     const router = useRouter()
//     const SchemaforgetPassword = z.object({
//         email: z.string().nonempty("Email is Required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email"), });

//     const forgetPasswordForm = useForm<z.infer<typeof SchemaforgetPassword>>({
//         defaultValues: {
            
//             email: "",
           
           
//         },
//         resolver: zodResolver(SchemaforgetPassword)
//     })

//    async function handelforgetPassword(values: z.infer<typeof SchemaforgetPassword>) {
//     const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, {
//         method: 'post',
//         body: JSON.stringify(values),
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     });
//     const data = await res.json()
//     console.log(data)

    
//     if (data.statusMsg === 'success') { 
//         toast.success("Password reset email sent!", { position: "top-center" })
//         router.push('/resetCode')
//     } else {
//         toast.error(data.message, { position: "top-center" })
//     }
// }
//     return (
//         <div className='pt-10'>
//             <div className='card shadow-2xl w-full sm:w-1/2 mx-auto my-5 p-6'>
//                 <h1 className='text-3xl text-center pt-4'>forgetPassword</h1>
//                 <Form {...forgetPasswordForm} >
//                     <form onSubmit={forgetPasswordForm.handleSubmit(handelforgetPassword)} className="space-y-4">
                 

//                         <FormField
//                             control={forgetPasswordForm.control}
//                             name='email'
//                             render={({ field }) => (
//                                 <FormItem className=' p-4'>
//                                     <FormLabel>Enter Your Email</FormLabel>
//                                     <FormControl>
//                                         <Input type='email' {...field} />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

                      

                     
//                         <div className='p-4'>
//                             <Button className='w-full bg-green-600 hover:bg-green-700' type='submit'>
//     Send Reset Email
//                             </Button>
//                         </div>
//                     </form>
//                 </Form>
//                 <Toaster richColors />
//             </div>
//         </div>
//     );
// }
