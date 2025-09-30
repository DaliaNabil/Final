'use server'
import React from 'react';
import { getMyUserToken } from '@/utils/utils';
import Link from 'next/link';

interface OrderProduct {
    _id: string;
    count: number;
    price: number;
    product: {
        title: string;
        imageCover: string;
        category: { name: string };
    };
}

interface UserOrder {
    id: string;
    totalOrderPrice: number;
    shippingAddress: {
        city: string;
        phone: string;
        details: string;
    } | null; 
    paymentMethodType: 'cash' | 'card';
    isPaid: boolean;
    isDelivered: boolean;
    createdAt: string;
    cartItems: OrderProduct[];
}


async function fetchUserOrders(): Promise<UserOrder[]> {
    try {
        const token = await getMyUserToken();
        if (!token) {
            console.warn("User is not authenticated. Returning empty order list.");
            return [];
        }

        const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders`, {
            method: 'GET',
            headers: {
                token: token as string,
            },
            cache: 'no-store', 
        });

        if (!res.ok) {
            console.error('Failed to fetch orders:', res.status, await res.text());
            return [];
        }

        const data = await res.json();
        
        return data.data || []; 

    } catch (error) {
        console.error("Error fetching user orders:", error);
        return [];
    }
}


export default async function AllOrders() {

    const orders = await fetchUserOrders();

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
        const day = String(date.getUTCDate()).padStart(2, '0');
        
        return `${year}/${month}/${day}`;
    };

    if (orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 text-center">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">No Orders Found</h1>
                <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">Looks like you haven t placed any orders yet.</p>
                <Link href="/" className="mt-6 text-white bg-blue-600 hover:bg-blue-700 font-semibold py-2 px-6 rounded-lg transition duration-200 shadow-md">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
            <h1 className="text-4xl font-extrabold mb-8 text-gray-900 dark:text-white border-b-4 border-blue-500 pb-2">Your Order History</h1>
            <div className="space-y-8">
                {orders.map((order, index) => (
                    <div 
                        key={order.id || index} 
                        className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border-t-4 border-gray-200 dark:border-gray-700"
                    >
                        <div className="md:flex justify-between items-start border-b pb-4 mb-4 dark:border-gray-700">
                            <div className='text-left'>

                                <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">Order ID: {String(order.id).substring(0, 8)}...</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">

                                    Placed On: {formatDate(order.createdAt)}
                                </p>
                            </div>
                            <div className="mt-3 md:mt-0 text-right"> 
                                <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                    {order.isDelivered ? 'Delivered' : 'Processing'}
                                </span>
                                <p className="text-2xl font-extrabold text-gray-900 dark:text-white mt-2">
                                    Total: ${order.totalOrderPrice.toFixed(2)}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm mb-6 text-left">
                            <div>
                                <p className="font-semibold dark:text-gray-300">City</p>

                                <p className="text-gray-600 dark:text-gray-400">{order.shippingAddress?.city || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="font-semibold dark:text-gray-300">Phone</p>
                                <p className="text-gray-600 dark:text-gray-400">{order.shippingAddress?.phone || 'N/A'}</p>
                            </div>

                            <div className="col-span-1 md:col-span-1">
                                <p className="font-semibold dark:text-gray-300">Address Details</p>
                                
                                <p className="text-gray-600 dark:text-gray-400">{order.shippingAddress?.details || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="font-semibold dark:text-gray-300">Payment Method</p>
                                <p className="text-gray-600 dark:text-gray-400 capitalize">
                                    {order.paymentMethodType === 'cash' ? 'Cash on Delivery' : 'Credit Card'}
                                </p>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold dark:text-gray-200 mb-3 border-t pt-3 dark:border-gray-700">Items ({order.cartItems.length})</h3>
                        <div className="space-y-3">
                            {order.cartItems.map(item => (
                                <div 
                                    key={item._id} 
                                    className="flex items-center space-x-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                                >
                                    <img 
                                        src={item.product.imageCover} 
                                        alt={item.product.title} 
                                        className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium dark:text-white">{item.product.title}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Category: {item.product.category.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-semibold dark:text-white">Qty: {item.count}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-300">@ ${item.price.toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
