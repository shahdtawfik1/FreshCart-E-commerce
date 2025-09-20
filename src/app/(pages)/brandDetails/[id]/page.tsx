import homePro from '@/Apis/homeProducts'
import BrandsProducts from '@/app/_components/brandProducts/BrandsProducts'
import { params } from '@/types/params.type'
import React from 'react'

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "product details",
  description: "buy by Category",
};
const BrandDetails = async ({params}:{params:Promise<params>}) => {
    const {id} : {id:string} = await params
const data = await homePro({ brand: id })
  return (
    <>
      <BrandsProducts initData ={data} id={id}/>
    </>
  )
}

export default BrandDetails
