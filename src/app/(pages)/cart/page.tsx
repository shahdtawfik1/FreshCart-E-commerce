"use client"
import CartCard from '@/app/_components/CartCard/CartCard'
import Loading from '@/app/_components/loding/Loading'
import { cartContext } from '@/context/contextCartProvider'
import { CartProduct } from '@/types/cartProductType'
import { toast } from 'react-toastify';
import React, { useContext } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { clearAllCartAction } from '@/cardActions/clearAllCart'
import emptyCart from "./../../../assets/images/no-resut.webp"
import Image from 'next/image'
import Link from "next/link";
import { IoTrashOutline } from "react-icons/io5";

const Cart = () => {
  const { data, isLoading,refetch } = useContext(cartContext)!
  const queryClinet = useQueryClient()
  // handle clear cart =================================================
  const { mutate, isPending } = useMutation({
    mutationFn: clearAllCartAction,
    onSuccess: () => {
      refetch()
      queryClinet.invalidateQueries({
        queryKey: ["userCart"]
      })
      toast.success("success", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }, onError: (error) => {
      toast.error(error.message || "some thing went wrong", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    
  })

  if (isLoading || isPending) {
    return <Loading />
  }
  const products = data?.data?.products || [];
  return (
    <main className="pt-[5rem] min-h-dvh">
      {products.length <= 0 ? <section className='flex flex-col justify-center items-center min-h-dvh'>
        <Image className="w-[600px] rounded-full" src={emptyCart} alt="cart is empty" />
        <Link href={"/products"} className='text-center bg-main font-medium text-white px-8 py-1 text-[1rem] cursor-pointer  rounded-[8px] capitalize hover:bg-green-500 transition-all duration-300'>add some products</Link>
      </section> : <section className="w-full md-[85%] px-3 md:px-7 lg:px-10  py-[1rem] ">
        <section className="flex justify-end" >
          <button type="button" onClick={() => mutate()} className="bg-red-500 text-right mb-4  font-medium text-white px-8 py-1 text-[1rem] cursor-pointer  rounded-[8px] capitalize hover:bg-red-400 transition-all duration-300 flex items-center gap-1"><IoTrashOutline /> clear all</button>
        </section>
        <section className="flex flex-wrap">
          <section className="relative  shadow-md sm:rounded-lg grow  ">
            <section className="w-full text-sm text-left  text-gray-500 ">
              {products.map((result: CartProduct) => <CartCard result={result} key={result._id} />)}
            </section>
          </section>
        </section>
        <section className="my-3 bg-white shadow-2xl px-10 py-4">
          <h2 className="text-[1.4rem] font-semibold text-center">Order summary</h2>
          <ul className="mb-3">
            <li className='capitalize py-2 text-[1.1rem]  font-[400] font-mono text-main'>items count :  <span className="text-black">{data?.numOfCartItems}</span></li>
            <li className='capitalize py-2 text-[1.1rem]  font-[400] font-mono text-main'>total : <span className="text-black">{data?.data.totalCartPrice} EGP</span></li>
          </ul>
          <Link href="/payment"  className='capitalize block text-center bg-main w-full py-2 text-white rounded-[8px] text-[1.1rem] cursor-pointer hover:bg-green-500 transition-all duration-300 '>check out</Link>
        </section>
      </section>}

<title>cart</title>
    </main>
  )
}

export default Cart
