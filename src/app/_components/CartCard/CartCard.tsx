"use client"
import React, { useContext, useState } from 'react'
import Image from 'next/image';
import { cartProduct } from '@/types/cartContext.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSpacificProductAction } from '@/cardActions/deleteSpacificProduct';
import { toast } from 'react-toastify';
import { ScaleLoader } from 'react-spinners';
import UpdateProductCart from '../updateProductCart/UpdateProductCart';
import { IoTrashOutline } from "react-icons/io5";
import { cartContext } from '@/context/contextCartProvider';
const CartCard = ({ result }: { result: cartProduct }) => {
  const [procutsId, setProductsId] = useState<string[]>([])
  const {refetch} = useContext(cartContext)! 
  const [id,setId] =useState("")

  // delete spacific product =============================================
  async function deleteProduct(id: string){
    setProductsId((prev) => [...prev, id])
    setId(id)
    return  deleteSpacificProductAction(id);
  }
  const queryClinet = useQueryClient()
  // handle delete spacific product=================================================
  const { mutate, isPending } = useMutation({
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      refetch()
      queryClinet.invalidateQueries({
        queryKey: ["userCart"]
      })
      toast.success(data.message||"success", {
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
    onError(error) {
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
    onSettled: () => {
      setProductsId(prev => prev.filter(prevId => prevId !== id))
    }
  })

  return (
    <>
      <main>
        <section className="bg-white py-3 relative border-b flex flex-wrap flex-row   border-gray-200 hover:bg-gray-50">
          {isPending && procutsId.includes(result.product.id) && <section className='absolute z-10 inset-0 bg-[#b7b5b57f] flex items-center justify-center'>
            <section className='flex '>
              <ScaleLoader
                color="#fff"
                height={30}
                width={4}
              />
            </section>
          </section>}

          <section className="py-2 sm:p-4 overflow-hidden">
            <Image width={200} height={200} src={result.product.imageCover} className="w-25  sm:w-32 max-w-full max-h-full" alt={result.product.title} />
          </section>
          <section className='md:flex md:items-center justify-between grow'>
            <p className="px-6 line-clamp-1 py-2 font-semibold text-gray-900 text-[1.3rem] sm:text-[1rem]">
              {result.product.title.split(" ",2).join(" ")}
            </p>
            <p className="px-6 py-2 font-semibold text-gray-900 text-[1.3rem] sm:text-[1rem] ">
              {result.price} EGP
            </p>
            <section className="flex items-center gap-4 justify-between">
              <section className="px-6 py-2">
                <UpdateProductCart result={result} />
              </section>
              <section className={`  px-6 py-2`} onClick={() => mutate(result.product.id)}>
                <button disabled={isPending} className={`${isPending ? "bg-gray-500" : "bg-red-600"}  font-medium text-white px-5 py-1 text-[1rem] cursor-pointer  rounded-[8px] hover:bg-red-400 transition-all duration-300 flex items-center gap-1`}>
                  <IoTrashOutline /> Delete
                </button>
              </section>
            </section>
          </section>
        </section>
      </main>
    </>
  )
}

export default CartCard