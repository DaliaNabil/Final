'use client'
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

import { WishlistButtonProps } from '@/types/wishlist.types';
import { addProductToWishlist, removeProductFromWishlist } from '@/actions/wishlistactions';


export default function WishlistButton({ productId, isInitiallyInWishlist }: WishlistButtonProps) {
    const [isInWishlist, setIsInWishlist] = useState(isInitiallyInWishlist);
    const [isLoading, setIsLoading] = useState(false);

    async function handleWishlistAction() {
        setIsLoading(true);
        let outPut;

        if (isInWishlist) {
            outPut = await removeProductFromWishlist(productId);
            if (outPut?.status === 'success') {
                toast.success(outPut.message || "تمت إزالة المنتج من قائمة الأمنيات.");
                setIsInWishlist(false);
            } else {
                toast.error(outPut?.message || "فشل في إزالة المنتج من قائمة الأمنيات.");
            }
        } else {
            outPut = await addProductToWishlist(productId);
            if (outPut?.status === 'success') {
                toast.success(outPut.message || "تمت إضافة المنتج إلى قائمة الأمنيات بنجاح!");
                setIsInWishlist(true);
            } else {
                toast.error(outPut?.message || "فشل في إضافة المنتج إلى قائمة الأمنيات.");
            }
        }
        setIsLoading(false);
    }

    const buttonClass = isInWishlist
        ? "bg-red-500 hover:bg-red-600 text-white"
        : "bg-gray-200 hover:bg-gray-300 text-gray-800";

    return (
        <form action={() => handleWishlistAction()}>
            <Button
                type="submit"
                className={`transition-colors duration-200 p-2 rounded-full ${buttonClass}`}
                disabled={isLoading}
            >
                <svg
                    className="w-5 h-5"
                    fill={isInWishlist ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-.318-.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                </svg>
            </Button>
        </form>
    );
}