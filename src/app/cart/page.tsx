import React from 'react';
import Image from 'next/image';
import { getMyUserToken } from '@/utils/utils';
import { Button } from '@/components/ui/button';
import { CartResponseType, ItemType } from '@/types/items.type';
import { CartData } from './../../types/cart.type';
import { getUserCart } from '@/services/cart.services';
import RemoveItemBtn from './RemoveItemBtn';
import { product } from '@/types/Products.type';
import { productItem } from '@/types/ProductDetails.type';
import ChangeCountBtn from './ChangeCountBtn';
import { ca } from 'zod/v4/locales';
import Link from 'next/link';
export default async function CartPage() {

    async function handelGetUserCart(): Promise<CartResponseType> {
       
        const res = await getUserCart();
        return res;
    }

    const { products, totalCartPrice, numOfCartItems  } = await handelGetUserCart();

    if (!products || numOfCartItems === 0) {
        return (
            <div className="container mx-auto p-8 text-center bg-white dark:bg-gray-900 min-h-[50vh] rounded-lg shadow-xl">
                <h1 className='text-4xl font-extrabold mb-4 text-gray-800 dark:text-white'>Shopping Cart</h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 mt-10">Your shopping cart is currently empty. Start adding some awesome products!</p>
            </div>
        );
    }

    return (
        <>
            <div className='flex justify-between p-4 border-b border-gray-200 dark:border-gray-700 items-center'>
                <h1 className='text-main text-4xl font-extrabold text-gray-900 dark:text-white'>Cart Shop ({numOfCartItems})</h1>
                <div className='flex space-x-4'>
                    {/* PAY */}
                    <Link href='/cart/payment'>
                        <Button className='cursor-pointer bg-green-700 hover:bg-green-800 text-lg rounded-xl p-4 transition duration-150' >Pay Now</Button>

                    </Link>
                    <Button className='cursor-pointer bg-red-700 hover:bg-red-800 text-lg rounded-2xl p-4' variant={'destructive'}>Remove All</Button>
                </div>
            </div>

            <div className="container mx-auto dark p-4">

                <h1 className='text-3xl font-bold mb-6 text-center text-gray-900 dark:text-white'>Shopping Cart</h1>
                <div className="relative dark overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-16 py-3">Image</th>
                                <th scope="col" className="px-6 py-3">Product</th>
                                <th scope="col" className="px-6 py-3">Quantity</th>
                                <th scope="col" className="px-6 py-3">Price</th>
                                <th scope="col" className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((cartItem: ItemType) => (
                                <tr
                                    key={cartItem.product.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-150"
                                >
                                    <td className="p-4">
                                        <Image
                                            src={cartItem.product.imageCover}
                                            className="w-16 md:w-24 max-w-full max-h-full rounded-md object-cover"
                                            alt={cartItem.product.title}
                                            width={96}
                                            height={96}
                                        />
                                    </td>

                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {cartItem.product.title}
                                    </td>

                                    <td className="px-6 py-4">
                                        <div className="flex items-center space-x-2">
                                            <ChangeCountBtn isIncrement id={cartItem.product.id} newCount={cartItem.count + 1} />
                                            <span className="font-bold text-lg text-gray-900 dark:text-white w-4 text-center">
                                                {cartItem.count}
                                            </span>

                                            <ChangeCountBtn id={cartItem.product.id} newCount={cartItem.count - 1} />
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 font-extrabold text-lg text-green-600 dark:text-green-400">
                                        {cartItem.price} EGP
                                    </td>

                                    <td className="px-6 py-4">
                                        <RemoveItemBtn id={cartItem.product.id} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex justify-end mt-8">
                    <h2 className='text-3xl font-extrabold text-gray-900 dark:text-white border-t border-gray-300 pt-4'>
                        Total Cart Price: <span className="text-red-600 dark:text-red-400">{totalCartPrice ?? 0} EGP</span>
                    </h2>
                </div>
            </div>
        </>
    );
}
