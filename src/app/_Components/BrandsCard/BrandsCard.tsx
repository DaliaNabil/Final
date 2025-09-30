"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { brand } from "@/types/brand.type";




export default function BrandsCard({brand}: {brand : brand}){
    const { image , name, _id} = brand;
    const [isLoading, setIsLoading] = useState(false);

    const handleLinkClick = () => {
     
      setIsLoading(true);
    };
    

    return(
       <div className='relative'>
         
            < >
                <Card className='transition-all hover:shadow-lg hover:scale-105 duration-500 cursor-pointer '>
                    <CardHeader className='relative h-60'>
                        <Image
                            src={image}
                            alt={name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className="object-cover rounded-md"
                        />
                        {isLoading && (
                            <div className="absolute inset-0 bg-gray-400 bg-opacity-50 flex items-center justify-center rounded-md">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                            </div>
                        )}
                    </CardHeader>
                    <CardContent>
                        <CardTitle className='text-main'>{name}</CardTitle>
                    </CardContent>
                </Card>
            </>
        </div>
    )
}
