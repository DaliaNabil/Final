'use client'
import Image from "next/image";
import React from "react";
import  Slider  from "react-slick";


export default function MainSlider() {
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
    <div className=" grid grid-cols-12 my-6 pt-6 pd-6">
        <div className=" col-span-9">
            <Slider {...settings}>
      <div>
        <Image src='/images/slider-image-1.jpeg' alt='img1' width={1000} height={1000} className=" w-full  object-cover h-96" />
      </div>
       <div>
        <Image src='/images/slider-image-2.jpeg' alt='img2' width={1000} height={1000} className=" w-full  object-cover h-96" />
      </div>
       <div>
        <Image src='/images/slider-image-3.jpeg' alt='img3' width={1000} height={1000}className=" w-full  object-cover h-96"  />
      </div>
    
    </Slider>
    </div>
        <div className=" col-span-3">
         
          <Image src='/images/skancear.jpeg' alt='imge ' width={500} height={300} className=" w-full  object-cover h-48"  />
         <Image src='/images/makup.jpeg' alt='imge ' width={500} height={300} className=" w-full  object-cover h-48"  />
        </div>

    </div>
  );
}
