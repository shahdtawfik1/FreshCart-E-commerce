import CategoryApi from "@/Apis/category";
import CategoryData from "@/app/_components/categoryData/CategoryData";
import React from "react";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Category",
  description: "buy by Category",
};
const Category = async () => {
  const data = await CategoryApi();

  return (
    <>
          <main className="pt-[5.4rem]">
        <section className="w-full md-[85%] px-3 md:px-7 lg:px-10">
          <h2 className="text-center mb-5 relative capitalize text-4xl font-semibold ">
             shop by category
          </h2>
           <CategoryData initData={data} />
        </section>
      </main>
    
    </>
  );
};

export default Category;
