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
    dots: true,
    arrows: true,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          arrows: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative">
        <Slider {...settings}>
          {[slide1, slide2, slide3, slide4].map((slide, index) => (
            <div key={index} className="relative aspect-[4/3] w-full">
              <div className="relative h-full w-full">
                <Image
                  src={slide}
                  alt={`Slide ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
