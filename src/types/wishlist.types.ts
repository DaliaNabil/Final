import { product } from "./Products.type";

export interface WishlistItemType {
    _id: string;
    imageCover: string;
    title: string;
    price: number;
    id: string;
}
 
export interface WishlistButtonProps {
    productId: string;
    isInitiallyInWishlist: boolean;
}

export interface WishlistApiResponse {
    status: string;
    count: number;
    data: {
        _id: string;
        imageCover: string;
        title: string;
        price: number;
        id: string;
    }[];
}
