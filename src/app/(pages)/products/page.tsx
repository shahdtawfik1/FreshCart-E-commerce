import React from "react";
import homePro from "@/Apis/homeProducts";
import { data } from "@/types/product.type";
import { categoryData } from "@/types/category.type";
import CategoryApi from "@/Apis/category";
import BrandsApi from "@/Apis/brands";
import { brandData } from "@/types/brands.type";
import GetAllProducts from "@/app/_components/getAllProducts/GetAllProducts";
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Products",
  description: "explore alot of products",
};
const Products = async ({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) => {
  const productData: data = await homePro(searchParams);
  const category: categoryData = await CategoryApi();
  const brandsData: brandData = await BrandsApi();
  return (
    <main className="pt-[4.5rem]">
      <section className="w-full md-[85%] px-3 md:px-7 lg:px-10 pt-[2rem]">
        <section>
        <GetAllProducts category={category} brandsData={brandsData} productData={productData}/>

       
        </section>
      </section>
    </main>
  );
};

export default Products;
