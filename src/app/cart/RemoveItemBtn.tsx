'use client'
import { Button } from '@/components/ui/button'
import React, { useContext } from 'react'
import { removeItemFormCart } from './cart.actions'
import { toast } from 'sonner'
import { CartContext } from '../_Components/MySessionProvider/CartContext'

export default function RemoveItemBtn({id}:{id:string}) {

    const { updateCartCount } = useContext(CartContext);

    async function handleRemoveItem(){
        const outPut = await removeItemFormCart(id)
        if(outPut === null){
            toast.error("Couldn't remove, please try again")
        } else {
            toast.success("Product removed")
            updateCartCount(outPut)
        }
    }

    return (
        <Button 
            onClick={handleRemoveItem}
            className="bg-red-600 text-white hover:bg-red-700 transition duration-150 p-2 rounded-lg"
            size="sm"
        >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
            Remove
        </Button>
    )
}