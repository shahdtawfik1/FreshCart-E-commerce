import React from 'react'

import { Order } from '@/types/order.type';
import OrderProduct from '../orderProduct/OrderProduct';

const OrderTable = ({ product }: { product: Order }) => {
    const formattedDate = new Date(product.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    console.log(product?.cartItems)
    
    return (
        <>
            <section className="mb-10 rounded-2xl border border-gray-200 shadow-md overflow-hidden bg-gradient-to-br from-gray-50 to-white">
                <section className="bg-gray-100 px-3 py-4 border-b border-gray-200">
                    <section className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        <section>
                            <h3 className="text-sm font-semibold text-gray-700 mb-1">Purchase Date</h3>
                            <p className="text-slate-600 font-medium">{formattedDate}</p>
                        </section>
                        <section className="  text-center">
                            <h3 className="text-sm font-semibold text-gray-700 mb-1">Order ID</h3>
                            <p className="text-slate-600 font-medium">{product.id}</p>
                        </section>
                        <section className=" md:text-center">
                            <h3 className="text-sm font-semibold text-gray-700 mb-1">Payment Type</h3>
                            <p className="text-slate-600 font-medium">{product.paymentMethodType}</p>
                        </section>
                        <section className=" text-center">
                            <h3 className="text-sm font-semibold text-gray-700 mb-1">Total Paid</h3>
                            <p className="text-gray-900 font-bold">{product.totalOrderPrice} <span className="font-semibold">EGP</span>
                            </p>
                        </section>
                    </section>
                </section>
                {product?.cartItems.map((item) => <OrderProduct key={item._id} item={item} />)}
            </section>
        </>
    )
}

export default OrderTable
