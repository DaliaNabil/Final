import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getWishlist } from '@/services/wishlist.servies';
import { WishlistItemType } from '@/types/wishlist.types';
import { addProductToWishlist, removeProductFromWishlist } from '../../actions/wishlistactions';

// Client-side wrappers to display toast notifications
// هذه الدوال تستخدم الـ 'use server' لتعريفها كـ Server Actions
// وتقوم بتغليف دوال الـ API لإظهار الـ Toast بعد انتهاء العملية
const handleRemoveItem = async (productId: string) => {
    'use server';
    const res = await removeProductFromWishlist(productId);
    if (res.status === 'success') {
        toast.success(res.message);
    } else {
        toast.error(res.message);
    }
};

const handleAddToCart = async (productId: string) => {
    'use server';
    const res = await addProductToWishlist(productId);
    if (res.status === 'success') {
        toast.success(res.message);
    } else {
        toast.error(res.message);
    }
};



export default async function WishlistPage() {
    const res = await getWishlist();

    if (res.status === 'error') {
        return (
            <div className="container mx-auto p-8 text-center bg-white dark:bg-gray-900 min-h-[50vh] rounded-lg shadow-xl">
                <h1 className='text-4xl font-extrabold mb-4 text-gray-800 dark:text-white'>My Wishlist</h1>
                <p className="text-xl text-red-500 dark:text-red-400 mt-10">
                    {res.status || "Failed to load wishlist. Please try again later."}
                </p>
            </div>
        );
    }

    const wishlistItems = res.data;
    const numWishlistItems = wishlistItems.length;

    if (numWishlistItems === 0) {
        return (
            <div className="container mx-auto p-8 text-center bg-white dark:bg-gray-900 min-h-[50vh] rounded-lg shadow-xl">
                <h1 className='text-4xl font-extrabold mb-4 text-gray-800 dark:text-white'>My Wishlist</h1>
                <p className="text-xl text-gray-500 dark:text-gray-400 mt-10">Your wishlist is currently empty. Start adding some awesome products!</p>
            </div>
        );
    }

    return (
        <div className='container mx-auto dark p-4'>
            <div className='flex justify-between p-4 border-b border-gray-200 dark:border-gray-700 items-center'>
                <h1 className='text-main text-4xl font-extrabold text-gray-900 dark:text-white'>My Wishlist ({numWishlistItems})</h1>
                <form >
                    <Button type='submit' className='cursor-pointer bg-red-700 hover:bg-red-800 text-lg rounded-2xl p-4' variant={'destructive'}>Clear All</Button>
                </form>
            </div>

            <div className="relative dark overflow-x-auto shadow-md sm:rounded-lg mt-6">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">Image</th>
                            <th scope="col" className="px-6 py-3">Product</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishlistItems.map((item: WishlistItemType) => (
                            <tr
                                key={item._id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 transition duration-150"
                            >
                                <td className="p-4">
                                    <Image
                                        src={item.imageCover}
                                        className="w-16 md:w-24 max-w-full max-h-full rounded-md object-cover"
                                        alt={item.title}
                                        width={96}
                                        height={96}
                                    />
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {item.title}
                                </td>
                                <td className="px-6 py-4 font-extrabold text-lg text-green-600 dark:text-green-400">
                                    {item.price} EGP
                                </td>
                                <td className="px-6 py-4 flex flex-col sm:flex-row gap-2">
                                    <form action={() => handleAddToCart(item._id)}>
                                        <Button type='submit' className="bg-blue-600 hover:bg-blue-700 transition duration-150">Add to Cart</Button>
                                    </form>
                                    <form action={() => handleRemoveItem(item._id)}>
                                        <Button type='submit' variant="destructive">Remove</Button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}