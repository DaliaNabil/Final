'use client'
import React from 'react'
import { Button } from '@/components/ui/button';
import { productItem } from '@/types/ProductDetails.type';
import ProductSlider from '../ProductSlider/ProductSlider';
import AddProductBtn from '../AddProductBtn/AddProductBtn';

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
);
export default function ProductDetailsCard({product}: { product:productItem}) {
  if (!product) {
    return null;
  }

  const { imageCover , title, ratingsAverage , price, category:{name} , _id ,description ,images} = product;
 
  return (
    <div className='w-4/5 m-auto p-9 relative'>
      <div className="absolute top-4 right-4 z-10">
        <HeartIcon />
      </div>
      <div className='grid grid-cols-12 gap-24 items-center'>
        <div className='col-span-4'>
          <ProductSlider images={images} />
        </div>
        <div className='col-span-7'>
          <h1>{title}</h1>
          <p className='text-gray-700 font-bold'>{description}</p>
          <h5 className='text-main my-10'>{name}</h5>
            <span ><i className="fa-solid fa-star rating-color pe-3"></i>{ratingsAverage}</span>
          <div className=' '>
           
            <h5>price : {product.priceAfterDiscount ?
              <>
                <span className='text-red-500 line-through me-3 '>{price}</span>
                <span className='font-bold'>{product.priceAfterDiscount} EGP</span>
              </>
              : <span className='font-bold'>{price} EGP</span>}
            </h5>
            <h3 className='text-gray-900 font-bold '> Category : {product.category.name}</h3>
            <h3 className='text-gray-900 font-bold'> Brands : {product.brand.name}</h3>
          </div>
          {/* button */}
          <AddProductBtn id={product.id}/>
        </div>
        
      </div>
    </div>
  );
}