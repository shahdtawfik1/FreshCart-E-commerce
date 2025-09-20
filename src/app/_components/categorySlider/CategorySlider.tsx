"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { toast } from "react-toastify";
import ErrorMessage from "../error/Error";
import { categoryData } from "@/types/category.type";
import Image from "next/image";
const CategorySlider = ({ initData } : {initData:categoryData}) => {
  // cache data on client side==============================================
  const { data } = useQuery({
    queryKey: ["category"],
    queryFn:() => initData,
    initialData: initData,
  });

    useEffect(() => {
      if (data?.message) {
        toast.error("some thing went wrong", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }, [data]);

    if(data?.message){
      return <main className='flex justify-center'> <ErrorMessage/></main>
    }
  //  ?jsxcode ==============================================================
  return (
    <main className="mb-[3rem]">
      <section className="w-full md-[85%] px-3 md:px-7 lg:px-10 h-[200px] ">
        <Swiper
          spaceBetween={0}
          modules={[Autoplay, Pagination]}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            320: { slidesPerView: 2 }, 
            640: { slidesPerView: 3 }, 
            768: { slidesPerView: 4 }, 
            1024: { slidesPerView: 6 },
            1280: { slidesPerView: 7 },
          }}
          className="mySwiper mb-7 pb-5 text-center"
        >
          {data?.data?.map((category) => (
            <SwiperSlide key={category._id} className="mb-5" >
              <Link href={`/categoryProducts/${category._id}`} className="h-full mb-6">
                <Image
                  className="w-full h-[250px] object-cover mb-2 cursor-pointer"
                  src={category.image}
                  alt={category.name}
                  width={500}
                  height={500}
                />
                <p className="font-semibold text-xl">{category.name}</p>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </main>
  );
};

export default CategorySlider;
