"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { FaStar } from "react-icons/fa6";
import Button from "../button/Button";
import WishList from "../wishList/WishList";
import { ProductDetailsData } from "@/types/productDetails.type";
import Image from "next/image";
import sale from "@/assets/images/sale.png";
const ShowProductDetails = ({
  initDate,
  id,
}: {
  initDate: ProductDetailsData;
  id: string;
}) => {
  // cache data on client side==============================================
  const { data } = useQuery({
    queryKey: ["productDetails", id],
    queryFn: () => initDate,
    initialData: initDate,
  });

  return (
    <section className="pt-[6rem] md:pt-[1rem] min-h-dvh">
      <section className="w-full md-[85%] px-3 md:px-7 lg:px-10 min-h-dvh">
        <section className="flex flex-col md:flex-row gap-6  items-center  min-h-dvh">
          {/* image */}
          <section className="w-[70%] md:w-1/3 rounded-2xl overflow-hidden">
          
            <Swiper
              modules={[Pagination, Autoplay]}
              className="mySwiper"
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            >
              {data.images.map((img, idx) => (

                <SwiperSlide key={idx} className="relative">
                    {data.priceAfterDiscount != 0 && data.priceAfterDiscount && (
              <Image
                src={sale}
                alt="sale"
                className="w-[130px] absolute -top-10 -left-1"
              />
            )}
                  <Image
                    src={img}
                    className="w-full h-[400px] object-cover"
                    alt="product"
                    width={500}
                    height={500}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>
          {/* details */}
          <section className="w-2/3">
            <section className="flex justify-between items-center">
              <h3 className="text-main text-[1.2rem] capitalize font-medium mb-3">
                {data.category.name}
              </h3>
              <h3 className="text-main text-[1.2rem] capitalize font-medium mb-3">
                {data.brand.name}
              </h3>
            </section>
            <h2 className="text-[1.4rem] tracking-wide mb-2">{data.title}</h2>
            <p className="max-w-[670px] text-[#949696] mb-3">
              {data.description}
            </p>
            <section className="flex justify-between mb-3">
              <section className="flex items-center gap-3">
                {data.priceAfterDiscount && (
                  <p className="font-[600] text-green-600 items-center">
                    {data.priceAfterDiscount} EGP
                  </p>
                )}
                <p
                  className={`${
                    data.priceAfterDiscount ? "line-through" : "text-green-600"
                  }  items-center ${
                    data.priceAfterDiscount ? "font-[400]" : "font-[600]"
                  }`}
                >
                  {data.price} EGP
                </p>
              </section>

              <section className="flex items-center gap-1 ">
                <p>{data.ratingsAverage}</p>
                <p className="text-yellow-400 flex gap-1">
                  {Array.from({ length: data.ratingsAverage }).map((_, idx) => (
                    <FaStar key={idx} />
                  ))}
                </p>
              </section>
            </section>
            <section className="flex items-center  gap-4">
              <WishList productId={data.id} prop={"static"} />
              <Button id={data.id} />
            </section>
          </section>
        </section>
      </section>
    </section>
  );
};

export default ShowProductDetails;
