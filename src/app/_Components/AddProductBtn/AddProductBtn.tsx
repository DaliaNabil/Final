'use client '
import { addProductToCart } from '@/app/cart/cart.actions';
import { Button } from '@/components/ui/button'
import { useContext } from 'react';
import { toast } from 'sonner';
import { CartContext } from '../MySessionProvider/CartContext';


export default function AddProductBtn({id}:{id: string}) {
 
    const{updateCartCount} = useContext(CartContext)
   async function handleAddToCart() {
        console.log('adding');
     const isAddedSuccessfully= await  addProductToCart(id)
  if(isAddedSuccessfully){
                 toast.success('Product Added Successfully',{position:"top-right"})
                 updateCartCount(isAddedSuccessfully);
  }
  else{
                toast.error('Error occurred while adding',{position:"top-right"})

  }

    }

    return (
        <>
            <div className='p-7'>
                <Button onClick={handleAddToCart} className='w-full cursor-pointer bg-main rounded-3xl '> Add to Cart</Button>
            </div>

        </>
    )

}