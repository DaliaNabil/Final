'use client'
import React from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import Image from 'next/image'
import { product } from '@/types/Products.type';
import Link from 'next/link';
import AddProductBtn from '../AddProductBtn/AddProductBtn';

const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 hover:text-red-500 transition-colors duration-200 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
);

export default function ProductCard({ product }: { product: product }) {

  const { imageCover, title, ratingsAverage, price, category: { name }, _id, priceAfterDiscount } = product
  return (
    <div className='pt-20' >
      <Card className=' bg-gray-200  rounded-3xl transition-all hover:shadow-lg hover:scale-105 duration-500 '>

      {/* icon */}
      <div className="absolute top-4 right-4 z-10">
        <HeartIcon />
      </div>
      <Link href={`/ProductDetails/${_id}`} >
        <CardHeader>

          <Image src={imageCover} alt={title} width={300} height={288} className='w-full h-72 object-center rounded-2xl' />
        </CardHeader>
      </Link>
      <CardContent>
        <CardTitle className='text-main pt-3'> {name} </CardTitle>
        <CardTitle className='pt-3' >{title.split(" ").slice(0, 2).join(" ")}
        </CardTitle>
        <div className='flex justify-between items-center pt-3'>
          <h5>price : {priceAfterDiscount ? <>
            <span className=' text-red-500 line-through me-3'>{price} </span>
            <span className=' font-bold'>{priceAfterDiscount} EGP</span>
          </> : <span className=' font-bold'>{price} EGP</span>}</h5>
          <span> {ratingsAverage} <i className="fa-solid fa-star rating-color"></i> </span>
        </div>
      </CardContent>
      {/* button */}
      <AddProductBtn id={product.id} />
      <CardFooter>
      </CardFooter>
    </Card>
    </div>
  )
}