// 'use client'
// import { Button } from '@/components/ui/button'
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
// import React, { useState } from 'react' 
// import { useForm } from 'react-hook-form'
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from 'zod'
// import { toast, Toaster } from 'sonner' 
// import { useRouter } from 'next/navigation'
// import Link from 'next/link'


// import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp"

// const SchemaResetCode = z.object({
//     resetCode: z.string().nonempty("Reset Code is Required").length(6, "Code must be 6 digits"), 
// })


// export default function ResetCode() {
//   const [btnLoading, setBtnLoading] = useState<boolean>(false) 
//   const Route = useRouter()

//   const ResetCodeForm = useForm<z.infer<typeof SchemaResetCode>>({
//     defaultValues: {
//       resetCode: "",
//     },
//     resolver: zodResolver(SchemaResetCode)
//   })

//   
//   async function handelResetCode(values: z.infer<typeof SchemaResetCode>) {
//     setBtnLoading(true); 

//     try {
//       const res = await fetch(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
//         method: 'post',
//         body: JSON.stringify({ resetCode: values.resetCode }), 
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
//       const data = await res.json()
//       console.log(data)
//       
//       if (data.status === 'Success') { 
//         toast.success("Code verified successfully! You can now set a new password.", { position: "top-center" });
//         Route.push('/resetPassword') 
//       } else {
//         toast.error(data.message || "Verification failed. Please check the code.", { position: "top-center" })
//       }
//     } catch(error) {
//         console.error("Network or verification error:", error);
//         toast.error("Network error. Please try again.", { position: "top-center" });
//     } finally {
//         setBtnLoading(false); 
//     }
//   }

//   return (
//     <div className=' pt-10 '>
//         <Toaster richColors /> 
//       <div className='card shadow-2xl w-full sm:w-1/2 mx-auto my-5 p-6'>
//         <h1 className='text-3xl text-center pt-4'>Verify Reset Code</h1>
//         <p className='text-center text-gray-500 mb-6'>Enter the 6-digit code sent to your email.</p>
//         <Form {...ResetCodeForm} >
//           <form onSubmit={ResetCodeForm.handleSubmit(handelResetCode)} className="space-y-6">

//             <FormField
//               control={ResetCodeForm.control}
//               name='resetCode'
//               render={({ field }) => (
//                 <FormItem className=' p-4 flex flex-col items-center space-y-4'> 
//                   <FormLabel>Verification Code</FormLabel>
//                   <FormControl>
//                     
//                     
//                       <InputOTP 
//                           {...field} 
//                           maxLength={6} 
//                           pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
//                           disabled={btnLoading}
//                       >
//                         <InputOTPGroup>
//                           <InputOTPSlot index={0} />
//                           <InputOTPSlot index={1} />
//                           <InputOTPSlot index={2} />
//                           <InputOTPSlot index={3} />
//                           <InputOTPSlot index={4} />
//                           <InputOTPSlot index={5} />
//                         </InputOTPGroup>
//                       </InputOTP>
//                     
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />


//             <div className='p-4'>
//               {btnLoading ? (
//                 <Button className=' w-full bg-green-600 ' type='button' disabled> 
//                     <span className="loader"></span> Verifying...
//                 </Button>
//             ) : (
//                 <Button className=' w-full bg-green-600 hover:bg-green-700   ' type='submit'>
//                   Verfiy Code
//                 </Button>
//             )}
//             </div>
//           </form>
//         </Form>
//         {/* Inline CSS for the loading spinner */}
//         <style>
//           {`
//             .loader {
//               width: 16px;
//               height: 16px;
//               border: 2px solid #FFF;
//               border-bottom-color: transparent;
//               border-radius: 50%;
//               display: inline-block;
//               box-sizing: border-box;
//               animation: rotation 1s linear infinite;
//             }
//             @keyframes rotation {
//               0% {
//                 transform: rotate(0deg);
//               }
//               100% {
//                 transform: rotate(360deg);
//               }
//             }
//           `}
//         </style>
//       </div>
//     </div>
//   );
// }
