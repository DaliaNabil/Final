'use client'



import Image from "next/image";
import React from "react";

import  Slider  from 'react-slick';



export default function ProductSlider( {images}:{images:string[]}) {
    const settings = {
    arrows :false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed:1000

  };
  return (
    <div>
                  <Slider {...settings}>
      {
        images.map((image)=>{
            return <div key={image}>
                        <Image src={image} alt= 'image' width={1000} height={1000} className=" w-full  object-cover h-96 rounded-2xl" />

            </div>
        })
      }
      
    </Slider>
    </div>
  )
}
