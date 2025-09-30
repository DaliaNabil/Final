

import { ProductDetails, productItem } from '@/types/ProductDetails.type'
import React from 'react'
import { product } from '@/types/Products.type';
import ProductDetailsCard from '@/app/_Components/ProductDetailsCard/ProductDetailsCard';



export default async function page({params}: {params:{id:string}} ) {
 const {id} = await params 
 console.log(id)
 const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
 const data: ProductDetails = await res.json()
 const product :productItem = data.data
console.log(data)
return (
<div>
<ProductDetailsCard product ={product} />
</div>
)
}