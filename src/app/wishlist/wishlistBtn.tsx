'use server';

import { getMyUserToken } from "@/utils/utils";
import { revalidatePath } from 'next/cache';


export async function addProductToWishlist(productId: string) {
    try {
        const token = await getMyUserToken();
        if (!token) return { status: 'error', message: 'User not authenticated.' };


        
        const res = await fetch('https://ecommerce.routemisr.com/api/v1/wishlist', {
            method: 'POST',
            headers:
               { token: token as string , 
                'Content-Type': 'application/json' },
            body: JSON.stringify({ productId }),
        });

        const result = await res.json();

        if (result.status === 'success') {
            revalidatePath('/wishlist');
            return { status: 'success', message: 'تمت إضافة المنتج إلى قائمة الأمنيات بنجاح!' };
        } else {

            return { status: 'error', message: result.message || 'فشل في إضافة المنتج.' };
        }
    } catch (error) {
        console.error("Error adding product to wishlist:", error);
        return { status: 'error', message: 'حدث خطأ غير متوقع أثناء الإضافة.' };
    }
}



export async function removeProductFromWishlist(productId: string) {
    try {
        const token = await getMyUserToken();
        if (!token) return { status: 'error', message: 'User not authenticated.' };



        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            method: 'DELETE',

            headers: { token: token as string }, 
        });


        if (res.ok) {
            revalidatePath('/wishlist');
            return { status: 'success', message: 'تمت إزالة المنتج من قائمة الأمنيات.' };
        } else {
            return { status: 'error', message: `فشل في إزالة المنتج: ${res.status}` };
        }
    } catch (error) {
        console.error("Error removing product from wishlist:", error);
        return { status: 'error', message: 'حدث خطأ غير متوقع أثناء الإزالة.' };
    }
}



export async function clearAllWishlist() {
    'use server';

    return { status: 'error', message: 'Clear All is not fully implemented in this action file yet.' }
}
