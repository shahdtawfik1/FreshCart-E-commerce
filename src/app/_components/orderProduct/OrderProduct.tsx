import React from 'react'
import Image from 'next/image';
import { CartItem } from '@/types/order.type';
const OrderProduct = ({ item }: { item: CartItem }) => {
    return (
        <>
            <section className="sectionide-y sectionide-gray-200">

                <section className="p-3 sm:p-5 grid grid-cols-2 md:grid-cols-4 gap-6 items-center hover:bg-gray-50 transition">
                    <section className="flex items-center gap-4   min-w-[180px] flex-1">
                        <section className="w-14 h-15 sm:w-16 sm:h-[100px] rounded-lg overflow-hidden bg-gray-100 shadow-sm flex-shrink-0">
                            <Image width={200} height={200} alt={item.product.title} className="w-full h-full object-cover" src={item.product.imageCover} />
                        </section>
                        <span className="font-medium text-gray-900 text-sm sm:text-base leading-snug">{item.product.title.split(" ",5).join(" ")}</span>
                    </section>
                    <section className="flex flex-col flex-1  md:items-center  min-w-[120px]">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Delivery Status</span>
                        <span className="mt-1 px-3 py-1 rounded-full text-xs font-medium w-fit bg-blue-100 text-blue-700">Pending</span>
                    </section>
                    <section className="flex flex-col flex-1 items-center min-w-[100px]">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">count</span>
                        <span className="mt-1 font-bold text-gray-900 text-sm sm:text-base">{item.count}</span>
                    </section>
                    <section className="flex flex-col flex-1 items-center min-w-[100px]">
                        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Price</span>
                        <span className="mt-1 font-bold text-gray-900 text-sm sm:text-base">{item.price} EGP</span>
                    </section>
                </section>
            </section>
        </ >
    )
}

export default OrderProduct
