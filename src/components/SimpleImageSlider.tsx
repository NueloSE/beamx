"use client";

import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";
import slide1 from "../../public/firstSlide.webp";
import slide2 from "../../public/secSlide.jpeg";
import slide3 from "../../public/thirdSlide.jpeg";
import slide4 from "../../public/fourthSlide.webp";

export default function SimpleImageSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  return (
    <Slider {...settings}>
      <div>
        <Image className="w-[650px] h-[550px]" src={slide1} alt="image" />
      </div>
      <div>
        <Image className="w-[650px] h-[550px]" src={slide2} alt="image" />
      </div>
      <div>
        <Image className="w-[650px] h-[550px]" src={slide3} alt="image" />
      </div>
      <div>
        <Image className="w-[650px] h-[550px]" src={slide4} alt="image" />
      </div>
    </Slider>
  );
}
