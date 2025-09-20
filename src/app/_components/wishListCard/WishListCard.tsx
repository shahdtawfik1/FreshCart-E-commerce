"use client"
import { whishlistProduct } from '@/types/wishList.type'
import Image from 'next/image'
import React, { useContext } from 'react'
import { FaStar } from 'react-icons/fa6'
import { ScaleLoader } from 'react-spinners'
import Button from "../button/Button";
import { IoTrashOutline } from 'react-icons/io5'
import { contextDelete } from '@/context/contextDeleteWishlist'
const WishListCard = ({ result }: { result: whishlistProduct }) => {
  const { mutate,loadingIds } = useContext(contextDelete)!

  return (
    <main>
      <section className="bg-white py-3 relative border-b flex flex-wrap flex-row justify-center items-center   border-gray-200 hover:bg-gray-50">
        { loadingIds.includes(result._id) && <section className='absolute z-10 inset-0 bg-[#b7b5b57f] flex items-center justify-center'>
          <section className='flex '>
            <ScaleLoader
              color="#fff"
              height={30}
              width={4}
            />
          </section>
        </section>} 
        <section className="py-2 sm:p-4 overflow-hidden w-[220px]  lg:max-w-[300px]">
          <Image width={400} height={200} src={result.imageCover} className="w-full h-[250px]  object-cover  " alt={result.title} />
        </section>
        <section className=' grow px-6 '>
          <p className=" py-2 line-clamp-1 font-[400] text-gray-900 text-[1.3rem] max-w-[200px] md:max-w-[450px] lg:max-w-[500px]">
            {result.title}
          </p>
             <p className=" py-2 line-clamp-2 font-[300] text-gray-600 text-[1.3rem] max-w-[200px] md:max-w-[450px] lg:max-w-[500px]">
            {result.description}
          </p>
          <section className='flex items-center gap-2'>
            {result.priceAfterDiscount != 0 && result.priceAfterDiscount && (
              <p className="font-[600] text-[1rem] text-green-600 items-center">
                {result.priceAfterDiscount} EGP
              </p>
            )}
            <p
              className={` ${result.priceAfterDiscount
                  ? "line-through text-[.9rem]"
                  : "text-green-600 text-[1rem]"
                }  items-center ${result.priceAfterDiscount ? "font-[300]" : "font-[600]"
                }`}
            >
              {result.price} EGP
            </p>
          </section>
          <p className="flex items-center gap-1 text-[1rem]">
            <span className="text-yellow-400">
              <FaStar />
            </span>
            <span>{result.ratingsAverage}</span>
          </p>
          <section className="flex items-center gap-[2rem] ">
            <section className={` py-4`} >
              <button disabled={loadingIds.includes(result._id)} onClick={()=>mutate(result._id)} className={`${loadingIds.includes(result._id)?"bg-gray-500" : "bg-red-600"}  font-medium text-white px-5 py-1 text-[1rem] cursor-pointer  rounded-[8px] hover:bg-red-400 transition-all duration-300 flex items-center gap-1`}>
                <IoTrashOutline /> Delete
              </button>
            </section>
            <section className={`py-4`} >
              <Button id={result._id} />
            </section>
          </section>
        </section>
      </section>
    </main>
  )
}

export default WishListCard
