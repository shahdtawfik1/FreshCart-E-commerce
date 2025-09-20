import getOrder from '@/Apis/getOrder'
import React from 'react'
import GetMyOrder from '../../_components/getMyOrder/getMyOrder';
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "all orders",
};

 const Orders = async () => {

const data = await getOrder()

  return (
    <main className='min-h-dvh pt-[4rem]'>
      <section className="pt-[1.2rem]  w-full md-[85%] px-3 md:px-7 lg:px-10">
      
          <GetMyOrder initData={data}/>
      </section>
    </main>
  )
}

export default Orders
