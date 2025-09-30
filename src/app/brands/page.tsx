
import Image from "next/image";
import { Suspense } from "react";



import { brand, BrandData } from "@/types/brand.type";
import BrandsCard from "../_Components/BrandsCard/BrandsCard";
// import MainSlider from '@/app/_Component/MainSlider/MainSlider';


export default async function BrandsDetails() {

   const res = await fetch( `https://ecommerce.routemisr.com/api/v1/brands`)
   const data: BrandData = await res.json()
    const brandsList : brand[] = data.data;
   console.log(data)
  return (
 <>
       <div className="">
        <h1 className=" font-bold  w-full h-20 text-main text-center ">All Brands</h1>
       
    </div>
   <div className=" grid lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 ">
  
     {
    brandsList.map((brand)=>{
        return <BrandsCard key={brand._id} brand={brand} />
    //   return <ProductCard key={product._id} product={product} />
    })
   } 
   </div>
 </>
  );
}

