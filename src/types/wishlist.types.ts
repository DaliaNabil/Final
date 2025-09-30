export interface ProductDetails {

    _id: string;
    title: string;
    slug: string;
    category: {
        name: string;
    };
    price: number;
    imageCover: string;


}

export interface WishlistItemType extends ProductDetails {

    id: string; 
}

export interface WishlistApiResponse {
    status: 'success';
    count: number;
    data: WishlistItemType[];
}

export interface UserTokenPayload {
    id: string;
    name: string;
    iat: number;
    exp: number;
}
