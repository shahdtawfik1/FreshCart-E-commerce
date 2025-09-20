
import getProductDetails from '@/Apis/getProductDetails'
import getRelatedProduct from '@/Apis/relatedProduct'
import MyCard from '@/app/_components/card/Card'
import ShowProductDetails from '@/app/_components/showProductDetails/ShowProductDetails'
import { params } from '@/types/params.type'
import { RelatedProducts } from '@/types/relatedProdcut'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import emptyCart from "@/assets/images/no-resut.webp"
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "product details",
};
const ProductDetails = async ({ params }: { params: Promise<params> }) => {

  const { id } = await params
  const { data } = await getProductDetails(id)
  const relatedProducts: RelatedProducts = await getRelatedProduct(data.category._id)

  if (!data) {
    <section className='flex flex-col justify-center items-center min-h-dvh'>
      <Image className="w-[600px] rounded-full" src={emptyCart} alt="cart is empty" />
      <Link href={"/products"} className='text-center bg-main font-medium text-white px-8 py-1 text-[1rem] cursor-pointer  rounded-[8px] capitalize hover:bg-green-500 transition-all duration-300'>add some products</Link>
    </section>
  }
  return (
    <main>
      <ShowProductDetails initDate={data} id={id} />

      <section className=" w-full md-[85%] px-3 md:px-7 lg:px-10 pb-[2rem]">
        <h2 className='text-main text-[1.5rem] font-[500] capitalize border-b-1 border-b-[#000] pb-3'>you might like</h2>
        <section className='grid grid-cols-1 sm:grid-cols-2 py-5 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5  gap-4'>
          {relatedProducts.data.map(product => <MyCard product={product} key={product._id} />)}
        </section>
      </section>

    </main>
  )
}

export default ProductDetails
