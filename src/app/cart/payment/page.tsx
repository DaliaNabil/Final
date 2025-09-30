'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useEffect, useRef, useState, useContext } from 'react' 
import { createCashOrder, createCheckoutSession } from './order.actions'
import { getUserCart } from '../../../services/cart.services' 
import { CartResponseType } from '@/types/items.type'
import { toast } from 'sonner' 
import { CartContext } from '../../_Components/MySessionProvider/CartContext'

interface OrderResponse {
  status?: string;
  message?: string;
}

export default function Payment() {
  
  const { updateCartCount } = useContext(CartContext); 

  const cityInput = useRef<HTMLInputElement>(null);
  const phoneInput = useRef<HTMLInputElement>(null);
  const detailsInput = useRef<HTMLInputElement>(null);

  const [cartId, setCartId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOrdering, setIsOrdering] = useState(false); 
  const [isOnlineOrdering, setIsOnlineOrdering] = useState(false); 


  async function handleGettingUserCart() {
    try {
      const res: CartResponseType = await getUserCart();
      
      if (res && res.cartId) {
        setCartId(res.cartId);
      } else {
        toast.error("Failed to load cart data. Please check if products exist.");
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
      toast.error("Failed to fetch cart data.");
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(function() {
    handleGettingUserCart();
  }, []);



  async function makeCashOrder() {
    const city = cityInput.current?.value || '';
    const phone = phoneInput.current?.value || '';
    const details = detailsInput.current?.value || '';

    if (!city || !phone || !details) {
      toast.error("Please fill in all address fields.");
      return;
    }
    
    if (!cartId) {
      toast.error("Cart ID is not available. Please refresh the page.");
      return;
    }

    setIsOrdering(true); 

    const shippingAddress = { details, city, phone };

    try {
      const response = await createCashOrder(cartId, shippingAddress) as OrderResponse | boolean;

      const isSuccess = response === true || (
          typeof response === 'object' && response !== null && response.status === 'success'
      );

      if (isSuccess) {
        toast.success("Cash order created successfully!");
        updateCartCount(0); 
      } else {
        
        const errorMessage = (typeof response === 'object' && response !== null && response.message) 
                           ? response.message 
                           : 'Error creating cash order. Please try again.';
        
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      toast.error("An unexpected error occurred during the payment process.");
    } finally {
      setIsOrdering(false);
    }
  }

  async function makeOnlineOrder(){
    const city = cityInput.current?.value || '';
    const phone = phoneInput.current?.value || '';
    const details = detailsInput.current?.value || '';

    if (!city || !phone || !details) {
      toast.error("Please fill in all address fields for online payment.");
      return;
    }
    
    if (!cartId) {
      toast.error("Cart ID is not available. Cannot start online payment.");
      return;
    }

    setIsOnlineOrdering(true);
    const shippingAddress = { details, city, phone };
    
    try {
      const url = await createCheckoutSession(cartId, shippingAddress);
      
      if (url === false){
        toast.error('Error creating checkout session. Please try again.')
      } else {
        window.open(url ,"_self")
      }
      
    } catch (error) {
      console.error("Online order creation failed:", error);
      toast.error("An unexpected error occurred during online payment setup.");
    } finally {
      setIsOnlineOrdering(false);
    }
  }


  if (isLoading) {
    return (
      <div className="w-1/2 mx-auto text-center py-20">
        <p className="text-xl dark:text-gray-300">Loading payment data...</p>
      </div>
    );
  }
  
  if (!cartId) {
    return (
      <div className="w-1/2 mx-auto text-center py-20">
        <h1 className="text-2xl text-red-500">Error: Cannot proceed with payment.</h1>
        <p className="dark:text-gray-400">Please ensure your shopping cart is valid and refresh the page.</p>
      </div>
    );
  }


  return (
    <div className='w-full max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 shadow-xl rounded-xl'>
      <h1 className='text-3xl font-bold text-gray-900 dark:text-white mb-6 text-center'>Confirm Order</h1>
      
      <div className='space-y-4'>
        
        <div>
          <Label htmlFor='city' className='font-semibold dark:text-gray-200'>City</Label>
          <Input id='city' className='rounded-xl mt-1 w-full dark:bg-gray-700 dark:text-white' ref={cityInput} placeholder='Example: Cairo' />
        </div>

        <div>
          <Label htmlFor='phone' className='font-semibold dark:text-gray-200'>Phone Number</Label>
          <Input id='phone' className='rounded-xl mt-1 w-full dark:bg-gray-700 dark:text-white' ref={phoneInput} type='tel' placeholder='01xxxxxxxx' />
        </div>

        <div>
          <Label htmlFor='details' className='font-semibold dark:text-gray-200'>Street and Building Details</Label>
          <Input id='details' className='rounded-xl mt-1 w-full dark:bg-gray-700 dark:text-white' ref={detailsInput} placeholder='Street Name, Apartment Number, Landmark' />
        </div>

      </div>

      <div className='pt-8 m-auto text-center space-y-4'>
      
        <Button 
          onClick={makeCashOrder} 
          disabled={isOrdering || isOnlineOrdering} 
          className='cursor-pointer w-full p-3 bg-green-700 hover:bg-green-800 rounded-xl transition duration-150 text-white font-bold text-lg'
        >
          {isOrdering ? 'Processing Cash Order...' : 'Place Cash Order'}
        </Button>

        
        <Button 
          onClick={makeOnlineOrder} 
          disabled={isOrdering || isOnlineOrdering} 
          className='cursor-pointer w-full p-3 bg-blue-600 hover:bg-blue-700 rounded-xl transition duration-150 text-white font-bold text-lg'
        > 
          {isOnlineOrdering ? 'Setting Up Payment...' : 'Proceed to Online Payment'}
        </Button>
      </div>
    </div>
  )
}
