"use client";

import Image from "next/image";
import React from "react";
import banner1 from "@/assets/images/banner1.jpg";

import slider1 from "@/assets/images/slider1.jpg";
import slider3 from "@/assets/images/slider3.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";

const HomeSlider = () => {
  return (
    <main className="py-6">
      <section className="w-full px-3 md:px-6 lg:px-10 flex flex-wrap gap-4">
        {/* Slider */}
        <section className="max-w-full rounded-xl overflow-hidden shadow-md">
          <Swiper
            pagination={{
              clickable: true,
            }}
            spaceBetween={10}
            slidesPerView={1}
            modules={[Autoplay, Pagination]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="mySwiper rounded-xl"
          >
            <SwiperSlide className="cursor-grab">
              <Image
                className="h-[380px] w-full object-cover rounded-xl"
                src={banner1}
                alt="Main promo"
              />
            </SwiperSlide>
            <SwiperSlide className="cursor-grab">
              <Image
                className="h-[380px] w-full object-cover rounded-xl"
                src={slider1}
                alt="Discount banner"
              />
            </SwiperSlide>
            <SwiperSlide className="cursor-grab">
              <Image
                className="h-[380px] w-full object-cover rounded-xl"
                src={slider3}
                alt="New arrivals"
              />
            </SwiperSlide>
          </Swiper>
        </section>

        {/* Static banners
        <section className="w-full md:w-1/3 flex flex-col gap-4">
          <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <Image
              className="h-[180px] w-full object-cover hover:scale-105 transition-transform duration-500"
              src={banner1}
              alt="Side promo 1"
            />
          </div>
          <div className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition duration-300">
            <Image
              className="h-[180px] w-full object-cover hover:scale-105 transition-transform duration-500"
              src={banner2}
              alt="Side promo 2"
            />
          </div>
        </section> */}
      </section>
    </main>
  );
};

export default HomeSlider;
