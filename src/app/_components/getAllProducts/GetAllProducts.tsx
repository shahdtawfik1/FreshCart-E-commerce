"use client"
import React, { useTransition } from 'react'
import AllProducts from "./../../_components/products/Products";
import Mypagination from "@/app/_components/myPagination/Mypagination";
import { data } from '@/types/product.type';
import Loading from "../loding/Loading";
import Filter from "@/app/_components/filter/Filter";
import { categoryData } from '@/types/category.type';
import { brandData } from '@/types/brands.type';
const GetAllProducts = ({ productData, brandsData, category }: {
  productData: data, category: categoryData;
  brandsData: brandData;
}) => {
  const [isPending, startTransition] = useTransition();
  if (isPending) {
    return <section><Loading /></section>
  }
  return (
    <>

      <Filter startTransition={startTransition} category={category} brandsData={brandsData} />
      <AllProducts initData={productData} />
      <Mypagination startTransition={startTransition} data={productData} />
    </>
  )
}

export default GetAllProducts
