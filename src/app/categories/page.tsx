


import { category, CategoryData } from "@/types/Category.type";

import { Suspense } from "react";
import { SubCategory, subData } from '@/types/SubCategory';
import { HomeLoading } from "../_Components/HomeLoading/HomeLoading";
import CategoryCard from "../_Components/CategoriesCard/CategoriesCard";




export default async function CategoryPage() {

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories`)

    const data: CategoryData = await res.json()

    const categoryList: category[] = data.data;




    return (

        <>



            <div className=" grid lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8 ">



                <Suspense fallback={<HomeLoading />}>

                    {

                        categoryList.map((category) => {

                            return <>
                            
                            <CategoryCard key={category._id} category={category} />

                            </>
                        })
                    }





                </Suspense>
 

            </div>

             


        </>

    );

}



