'use server'

import { getMyUserToken } from "@/utils/utils"
import { revalidatePath, revalidateTag } from "next/cache"
import { toast } from "sonner"

export async function addProductToCart(productId: string) {


    const token = await getMyUserToken()
    if (token) {

        const res = await fetch('https://ecommerce.routemisr.com/api/v1/cart', {
            method: 'post',
            body: JSON.stringify({ productId }),
            headers: {
                "Content-Type": "application/json",
                token: token as string
            }
        })

        const finalRes = await res.json()

        console.log('finalRes', finalRes)


        if (finalRes.status === "success") {
            // toast.success(finalRes.message,{position:"top-right"})
            //    revalidatePath('/cart')
            revalidateTag('getUserCart')
            return finalRes.numOfCartItems

        }
        else {
            // toast.error('Error occurred while adding',{position:"top-right"})
            return false
        }
    }
}


export async function removeItemFormCart(id: string) {
    const token = await getMyUserToken();
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        method: "DELETE",
        headers: {
            token: token as string,
        },
    });

    if (!res.ok) {
        console.error('API Error:', res.status, await res.text());
        return null;
    }

    const final = await res.json();
    console.log('remove final', final);

    if (final.status === "success") {
        revalidatePath('/cart');
        return final.numOfCartItems;
    } else {
        return null;
    }
}


export async function changeCount(id: string, count: number) {
    const token = await getMyUserToken();
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        method: "PUT",
        headers: {
            token: token as string,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ count })
    });

    if (!res.ok) {
        console.error('API Error:', res.status, await res.text());
        return null;
    }

    const final = await res.json();
    console.log('change final', final);

    if (final.status === "success") {
        revalidatePath('/cart'); 
      return final.numOfCartItems
    } else {
        return null;
    }
}