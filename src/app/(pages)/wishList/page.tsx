"use client"
import Loading from '@/app/_components/loding/Loading'
import WishListCard from '@/app/_components/wishListCard/WishListCard'
import { wishlistContext } from '@/context/contextWishListProvider'
import { whishlistProduct } from '@/types/wishList.type'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext } from 'react'
import { toast } from 'react-toastify'
import emptyCart from "./../../../assets/images/no-resut.webp"

const WishList = () => {

  const { data, isLoading, isError } = useContext(wishlistContext)!
  if (isLoading) {
    return <Loading />
  }
  if (isError) {
    toast.error("some thing went wrong", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }
  const products = data?.data || [];
  return (
    <main className="pt-[4rem] min-h-dvh">
      {products.length <= 0 && <section className='flex flex-col justify-center items-center min-h-dvh'>
        <Image className="w-[600px] rounded-full" src={emptyCart} alt="cart is empty" />
        <Link href={"/products"} className='text-center bg-main font-medium text-white px-8 py-1 text-[1rem] cursor-pointer  rounded-[8px] capitalize hover:bg-green-500 transition-all duration-300'>add some products</Link>
      </section>}

      <section className="w-full md-[85%] px-3 md:px-7 lg:px-10  py-[1rem] ">
        <section className="flex flex-wrap">
          <section className="relative  shadow-md sm:rounded-lg grow  ">
            <section className="w-full text-sm text-left  text-gray-500 ">

              {products.map((result: whishlistProduct) => <WishListCard key={result._id} result={result} />)}

            </section>
          </section>
        </section>
      </section>
      <title>wish list</title>
    </main>
  )
}

export default WishList
