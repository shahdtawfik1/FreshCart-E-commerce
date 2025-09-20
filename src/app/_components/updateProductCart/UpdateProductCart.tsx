"use client"
import { updateCartProductAction } from '@/cardActions/updateCartAction'
import { cartContext } from '@/context/contextCartProvider'
import { cartProduct } from '@/types/cartContext.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useContext, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { toast } from 'react-toastify'

const UpdateProductCart = ({ result }: { result: cartProduct }) => {
  const [loadingIds, setLoadingIds] = useState<string[]>([])
  const [id, setID] = useState<string>("")
  const { refetch } = useContext(cartContext)!
  // update product Cart product =============================================
  async function UpdateProduct({ id, count }: { id: string, count: number }) {
    setLoadingIds((prev) => [...prev, id])
    setID(id)
    return updateCartProductAction(id, count);
  }
  const queryClinet = useQueryClient()
  // handle update product product=================================================
  const { mutate } = useMutation({
    mutationFn: UpdateProduct,
    onSuccess: (data) => {
      refetch()
      queryClinet.invalidateQueries({
        queryKey: ["userCart"]
      })
      toast.success(data.status || "success", {
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
    onError: (error) => {
      toast.error(error.message, {
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

    ,
    onSettled: () => {
      setLoadingIds(prev => prev.filter(prevId => prevId !== id))
    }
  })


  return (
    <section className="flex items-center  ">
      {loadingIds.includes(result.product.id) ? <ClipLoader color="#95989b" size={20} /> :

        <>
          <button onClick={() => mutate({ id: result.product.id, count: result.count - 1 })} className="inline-flex cursor-pointer items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
            </svg>
          </button>
          <section>
            <span className="bg-gray-50 w-14 border text-center border-gray-300 text-gray-900 text-sm rounded-lg  block px-2.5 py-1  dark:placeholder-gray-400 ">
              {result.count}
            </span>
          </section>
          <button onClick={() => mutate({ id: result.product.id, count: result.count + 1 })} className="inline-flex cursor-pointer items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
            <span className="sr-only">Quantity button</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
            </svg>
          </button>
        </>

      }

    </section>
  )
}

export default UpdateProductCart
