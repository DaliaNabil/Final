import { product } from "@/types/Products.type";
import Image from "next/image";
import ProductCard from "../_Components/productCard/ProductCard";


export default async function Home() {
   async function getAllProducts(): Promise<product[]|null> {
    
    try{
     
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products`)
       const finalRes = await res.json()
    return finalRes.data;

    } catch(error){
      console.log('error',error);
      return null;
    }
  
   }

   const allProducts = await getAllProducts()
   console.log( 'allProducts' , allProducts)
  return (
    <>
 

      <div className=" text-center ">
        <h1 className=" pb-5 font-extrabold w-6xl  text-main">Products</h1>
        <p className=" text-gray-700 font-bold">Discover amazing products from our collection</p>
    </div>
       <div className=" grid lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 rounded-2xl ">
 
     {allProducts?.map((product)=>{
      return <ProductCard key={product._id} product={product} />
    })}
   </div>
    </>
  );
}
