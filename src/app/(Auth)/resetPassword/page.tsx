// 'use client'
// import { Button } from '@/components/ui/button'
// import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import React, { useState } from 'react'
// import {  useForm } from 'react-hook-form'
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from 'zod'
// import { toast, Toaster } from 'sonner'
// import { useRouter } from 'next/navigation'
// import {  Route } from 'lucide-react'
// import  Link  from 'next/link';
 
// export default function ResetPassword() {
//     const [btnLoading, setBtn] = useState<boolean>(true)
//    const Route = useRouter()
//   const SchemaResetPassword = z.object({
//   email: z.string().nonempty("Email is Required").regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email"),
//   newPassword: z.string().nonempty("Password is Required").regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/, "Password must contain Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"),
 
//   })
//    const ResetPasswordForm = useForm <z.infer< typeof SchemaResetPassword>>({
//     defaultValues:{
    
//     email:"",
//     newPassword:"",
    
// },
// resolver: zodResolver(SchemaResetPassword)
//    })

//     async function handelResetPassword(values: z.infer< typeof SchemaResetPassword>){
//       setBtn(false)
//         const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, {
//      method: 'put',
//      body:JSON.stringify(values),
//      headers: {
//          'Content-Type': 'application/json',
//      },
//  });
//      const data = await res.json()
//      setBtn(false)
//      console.log(data)
//      if (data.token){
//       Route.push('/login ')
//     } else{
//       toast.error(data.message , { position:"top-center"})
//      }
//     }
   
//   return (
//   <div  className=' pt-10  '>
//      <div className='card shadow-2xl w-1/2 mx-auto my-5 '>
//       <h1 className='text-3xl text-center pt-4'>ResetPassword</h1>
//       <Form {...ResetPasswordForm} >
//         <form onSubmit={ResetPasswordForm.handleSubmit(handelResetPassword)} >
         

// <FormField
//             control={ResetPasswordForm.control}
//             name='email'
//             render={({ field }) => (
//               <FormItem className=' p-4'>
//                 <FormLabel>Enter Your Email</FormLabel>
//                 <FormControl>
//                   <Input type='email' {...field} />
//                 </FormControl>
//                 <FormDescription>
                  
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />


//           <FormField
//             control={ResetPasswordForm.control}
//             name='newPassword'
//             render={({ field }) => (
//               <FormItem className=' p-4'>
//                 <FormLabel>Enter Your New Password</FormLabel>
//                 <FormControl>
//                   <Input type='password' {...field} />
//                 </FormControl>
//                 <FormDescription>
                  
//                 </FormDescription>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />

//              {
//                 btnLoading? <Button className=' w-full bg-main hover:bg-green-700   ' type='submit'> ResetPassword </Button> :  <Button className=' w-full bg-main   ' type='button'> <span className="loader"></span></Button>
//              }
         

          
//         </form>
//       </Form>
//     </div>
//   </div>
//   );
// }