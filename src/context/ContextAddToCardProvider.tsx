"use client"
import { addToCardAction } from '@/cardActions/AddtoCartAction'
import { AddToCartContextType } from '@/types/contextAddtoCard.type'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { createContext,  useContext,  useState } from 'react'
import { toast } from 'react-toastify'
import { cartContext } from './contextCartProvider'

export const contextAddToCard = createContext<AddToCartContextType | null>(null)
const ContextAddToCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [idProduct, setIDProduct] = useState<string>("")
  const [loadingIds, setLoadingIds] = useState<string[]>([])
  const {refetch} = useContext(cartContext)! 
  async function addToCart(id: string) {
    setLoadingIds(prev => [...prev, id])
    setIDProduct(id)
    return  addToCardAction(id)
  }

  const queryClinet = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: addToCart,
    onSuccess: (data) => {
      refetch()
      queryClinet.invalidateQueries({
        queryKey: ["userCart"]
      })
      toast.success(data.message, {
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
      setLoadingIds(prev => prev.filter(prevId => prevId !== idProduct))
    }
  })

  const value: AddToCartContextType = {
    mutate,
    loadingIds,
  }

  return (
    <contextAddToCard.Provider value={value}>
      {children}
    </contextAddToCard.Provider>
  )
}

export default ContextAddToCardProvider
