'use server'

import { WishlistApiResponse } from "@/types/wishlist.types";
import { getMyUserToken } from "@/utils/utils";

export async function getWishlist(): Promise<WishlistApiResponse | { status: 'error', message: string }> {
    try {
        const token = await getMyUserToken();
        if (!token) {
            return { status: 'error', message: 'User not authenticated.' };
        }

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            method: 'GET',
            headers: {
                token: token as string,
            },
            next: {
                tags: ['getWishlist'],
                revalidate: 60,
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('API responded with failure status:', res.status, errorText);
            return { status: 'error', message: `API error: ${res.status}` };
        }

        const final: WishlistApiResponse = await res.json();

        if (final.status === 'success') {
            return final;
        } else {
            return { status: 'error', message: final.status || 'Failed to fetch wishlist data.' };
        }

    } catch (error) {
        console.error("Critical error fetching user wishlist:", error);
        return { status: 'error', message: "An unexpected error occurred. Please try again." };
    }
}
