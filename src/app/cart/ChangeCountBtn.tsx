
'use client'
import { Button } from '@/components/ui/button'
import React, { useContext } from 'react'
import { changeCount } from './cart.actions'
import { toast } from 'sonner';
import { CartContext } from '../_Components/MySessionProvider/CartContext';

export default function ChangeCountBtn({isIncrement = false ,id , newCount }: { isIncrement?:boolean ; id:string ; newCount:number ;}) {
  


  const {updateCartCount} = useContext(CartContext)
   async function handleChangeCount(){
  const output =  await changeCount(id , newCount)

   if (output === null){
    toast.error('Error , please try again')
   } else{
    toast.success(`Prouduct count is : ${newCount}`)
 updateCartCount(output)
   }
    }
  
  return (
<Button onClick={handleChangeCount} disabled={newCount==0} className='cursor-pointer text-2xl rounded-2xl bg-main'> {isIncrement? "+" : '-'} </Button>
  )
}
