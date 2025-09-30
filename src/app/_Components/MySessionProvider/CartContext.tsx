'use client';

import { createContext, ReactNode, useState } from "react";



export const CartContext = createContext({ cartCount: 0, updateCartCount: (x: number) => { } })
export default function CartContextProviders({ children }: { children: ReactNode }) {
    const [cartCount, setCartCount] = useState(0)
   
   
    function updateCartCount(newCount: number) {
        setCartCount(newCount)
    }

     
     return  <CartContext.Provider value={{ cartCount, updateCartCount }}>
            {children}
        </CartContext.Provider>
    ;
}