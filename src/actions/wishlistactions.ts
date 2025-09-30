'use server';

import { getMyUserToken } from "@/utils/utils";
import { revalidateTag } from "next/cache";

export async function addProductToWishlist(productId: string) {
    try {
        const token = await getMyUserToken();
        if (!token) {
            return { status: 'error', message: 'User not authenticated.' };
        }

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token: token as string,
            },
            body: JSON.stringify({ productId }),
        });

        const data = await res.json();

        if (res.ok && data.status === 'success') {
            revalidateTag('getWishlist');
            return { status: 'success', message: 'Product added to wishlist successfully!' };
        } else {
            return { status: 'error', message: data.message || 'Failed to add product to wishlist.' };
        }
    } catch (error) {
        console.error("Error adding product to wishlist:", error);
        return { status: 'error', message: "An unexpected error occurred." };
    }
}

export async function removeProductFromWishlist(productId: string) {
    try {
        const token = await getMyUserToken();
        if (!token) {
            return { status: 'error', message: 'User not authenticated.' };
        }

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            method: 'DELETE',
            headers: {
                token: token as string,
            },
        });

        const data = await res.json();
        
        if (res.ok && data.status === 'success') {
            revalidateTag('getWishlist');
            return { status: 'success', message: 'Product removed from wishlist successfully!' };
        } else {
            return { status: 'error', message: data.message || 'Failed to remove product from wishlist.' };
        }
    } catch (error) {
        console.error("Error removing product from wishlist:", error);
        return { status: 'error', message: "An unexpected error occurred." };
    }
}

