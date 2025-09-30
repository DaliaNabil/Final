'use server'
import { CartResponseType, ItemType } from "@/types/items.type";
import { getMyUserToken } from "@/utils/utils";

export interface CartApiResponse {
    numOfCartItems: number;
    data: {
        _id: string; 
        products: ItemType[];
        totalCartPrice: number;
    };
    status: string;
}

export async function getUserCart(): Promise<CartResponseType> {
    try {
        const token = await getMyUserToken();
        
        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
            method: 'GET',
            headers: {
                token: token as string, 
            },
            cache: "no-store", 
        });

        if (!res.ok) {
            console.error('API responded with failure status:', res.status);
            return { numOfCartItems: 0, products: [], totalCartPrice: 0, cartId: '' };
        }
        
        const final: CartApiResponse = await res.json();
        
        if (final.data && final.data._id) {
            const { numOfCartItems, data: { products, totalCartPrice, _id: cartId } } = final;
            
            return { numOfCartItems, products, totalCartPrice, cartId };
        }
        
        return { numOfCartItems: 0, products: [], totalCartPrice: 0, cartId: '' };

    } catch (error) {
        console.error("Critical error fetching user cart:", error);
      
        return { numOfCartItems: 0, products: [], totalCartPrice: 0, cartId: '' };
    }
}
