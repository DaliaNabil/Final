'use client';



import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'sonner';
import CartContextProviders from "./CartContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <CartContextProviders>
      {children}
      <Toaster />
      </CartContextProviders>
    </SessionProvider>
  );
}

