 
 'use server'
 import { getMyUserToken } from "@/utils/utils"
import { JSONSchema } from "zod/v4/core"
import { revalidatePath } from 'next/cache';

export type shippingAddressType={
    details: string,
    phone:string,
    city: string,
}

export async function createCashOrder(cartId:string , shippingAddress:shippingAddressType) {
 
    const token = await getMyUserToken()
  const res =await  fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,{
        method:'POST',
        body :JSON.stringify({shippingAddress}),
        headers:{
            "Content-Type":"application/json",
            token :token as string
        }
    })

    const final = await res.json()
     console.log('final create order', final)
     if(final.status === "success"){
        revalidatePath('/cart');
        return true
     }else {
        return false
     }
}




export async function createCheckoutSession(cartId:string , shippingAddress:shippingAddressType) {
 
    const token = await getMyUserToken()
  const res =await  fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,{
        method:'POST',
        body :JSON.stringify({shippingAddress}),
        headers:{
            "Content-Type":"application/json",
            token :token as string
        }
    })

    const final = await res.json()
     console.log('final create checkout', final)
     if(final.status === "success"){
        // revalidatePath('/cart');
        return final.session.url
     }else {
        return false
     }
}
