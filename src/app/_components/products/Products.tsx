"use client"

import React, { useEffect, useState } from 'react'
import MyCard from '../card/Card'
import { data } from '@/types/product.type'
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import Loading from '../loding/Loading';
import ErrorMessage from '../error/Error';
import noResult from "@/assets/images/no-resut.webp"
import Image from 'next/image';
const AllProducts = ({ initData }: { initData: data }) => {
  const searchParams = useSearchParams();
  const searchParamsString = searchParams.toString();
  const [loading, setLoading] = useState(false);

  const { data }: { data: data } = useQuery({
    queryKey: ["products", searchParamsString],
    queryFn: () => initData,
    initialData: initData,
  });

  // start loading====================================================
  useEffect(() => {
    if (searchParamsString) {
      setLoading(true);
    }
  }, [searchParamsString]);
  // stop loading===========================================================
  useEffect(() => {
    if (data) {
      setLoading(false);
    }
  }, [data]);
  if (data.message) {
    return <main className='min-h-dvh flex justify-center items-center'> <ErrorMessage /></main>
  }
  if (loading) {
    return <section className=" flex justify-center items-center min-h-screen"><Loading /></section>
  }
const products = data?.data || []
  return (
    <>
      <main >
        <section className="w-full md-[85%] px-3 md:px-7 lg:px-10 my-5 py-7">
          {products.length > 1 ? <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5  gap-4">
            {products.map((product) => (
              <MyCard product={product} key={product._id} />
            ))}
          </section> : <section className='flex justify-center items-center min-h-screen'><Image className='w-[700px] rounded-full' src={noResult} alt="no result" /></section>}
        </section>
      </main>
    </>
  )
}

export default AllProducts
