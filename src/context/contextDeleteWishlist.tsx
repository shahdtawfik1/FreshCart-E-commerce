"use client"
import { deleteWishlistAction } from '@/wishListAction/deleteWishList'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify'
import { wishlistContext } from './contextWishListProvider'
import { wishlistDeleteContext } from '@/types/wishList.type'

export const contextDelete = createContext<wishlistDeleteContext | undefined>(undefined)
const ContextDeleteWishlistProvider = ({ children }: { children: React.ReactNode }) => {

  const [loadingIds, setLoadingIds] = useState<string[]>([])
  const [id, setId] = useState<string>("")
  const {refetch} = useContext(wishlistContext)!
  // delete product from wishcart====================================
  async function deleteWishlist(id: string) {
  
    setLoadingIds(prev => [...prev, id])
    setId(id)
    return deleteWishlistAction(id)
  }
  // handle delete product==========================
  const queryClinet = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: deleteWishlist,
    onSuccess: (data) => {
      refetch()
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
      queryClinet.invalidateQueries({
        queryKey: ["userWishList"],
      })
    },
    onError: (data) => {
      toast.error(data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }, onSettled: () => {
      console.log(id)
      setLoadingIds(prev => prev.filter(prevId => prevId !== id))
    }
  })

  const value: wishlistDeleteContext = {
    mutate,
    loadingIds,
  }


  return (
    <contextDelete.Provider value={value}>
      {children}
    </contextDelete.Provider>
  )
}

export default ContextDeleteWishlistProvider
