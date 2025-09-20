"use client";

import { data } from "@/types/product.type";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import MyCard from "../card/Card";
import noResult from "@/assets/images/no-resut.webp";
import Image from "next/image";
const BrandsProducts = ({ initData, id }: { initData: data; id: string }) => {
  const { data }: { data: data } = useQuery({
    queryKey: ["brandsProducts", id],
    queryFn: () => initData,
    initialData: initData,
  });
  return (
    <main>
      <section className="w-full md-[85%] px-3 md:px-7 lg:px-10 pt-[4rem]">
        {data?.data.length >= 1 ? (
          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5 py-[2rem] gap-4">
            {data?.data.map((product) => (
              <MyCard key={product._id} product={product} />
            ))}
          </section>
        ) : (
          <section className="flex justify-center items-center min-h-screen">
            <Image
              className="w-[600px] rounded-full"
              src={noResult}
              alt="no result"
            />
          </section>
        )}
      </section>
    </main>
  );
};

export default BrandsProducts;
