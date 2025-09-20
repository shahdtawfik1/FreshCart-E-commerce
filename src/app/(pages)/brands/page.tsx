import BrandsApi from "@/Apis/brands";
import BrandsData from "@/app/_components/BrandsData/BrandsData";
import Loading from "@/app/_components/loding/Loading";
import React, { Suspense } from "react";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Brands",
  description: "buy by brands",
};
const Brands = async () => {
const data = await BrandsApi()
  return (
    <>
      <main className="pt-[5.4rem]">
        <section className="w-full md-[85%] px-3 md:px-7 lg:px-10">
          <h2 className="text-center mb-5 relative capitalize  text-4xl font-semibold ">
            all brands
          </h2>
          <Suspense fallback={<Loading/>}>
          <BrandsData initData={data}/>
          </Suspense>
        </section>
      </main>
    </>
  );
};

export default Brands;
