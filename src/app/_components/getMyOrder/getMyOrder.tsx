"use client"
import React from 'react'

import { Orders } from '@/types/order.type';
import { useQuery } from '@tanstack/react-query';
import OrderTable from '../orderTable/OrderTable';
import emptyCart from "./../../../assets/images/no-resut.webp"
import Link from "next/link";
import Image from 'next/image'
import Loading from '../loding/Loading';
const GetMyOrder = ({ initData }: { initData: Orders }) => {

    const { data, isLoading } = useQuery({
        queryKey: ["orders"],
        queryFn: () => initData

    })
    if (isLoading) {
        return <section className='min-h-dvh flex items-center justify-center'> <Loading /></section>
    }
    const AllData = data?.length || 0
    return (
        <>
            {AllData > 0 ? <>
                <h2 className='text-[1.7rem] font-[500] text-main text-center mb-4 capitalize tracking-wide'>all orders</h2>
                {data?.map(product => <OrderTable key={product._id} product={product} />)}  </> : <section className='flex flex-col justify-center items-center min-h-dvh'>
                <Image className="w-[600px] rounded-full" src={emptyCart} alt="cart is empty" />
                <Link href={"/products"} className='text-center bg-main font-medium text-white px-8 py-1 text-[1rem] cursor-pointer  rounded-[8px] capitalize hover:bg-green-500 transition-all duration-300'>buy some products</Link>
            </section>}
        </>
    )
}

export default GetMyOrder
