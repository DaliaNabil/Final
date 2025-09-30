
import { product } from '@/types/Products.type';

export type ItemType ={
    count :number;
    numOfCartItems?: number;
    _id : string;
    price :number;
    title: string;
    imageCover: string;
    product:product;
}

  export type CartResponseType = {products : ItemType [], totalCartPrice : number, numOfCartItems :number ,cartId:string}
