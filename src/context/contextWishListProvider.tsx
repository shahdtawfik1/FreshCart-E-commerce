"use client"
import { contextData } from '@/types/wishList.type'
import { getUserWishlist } from '@/wishListAction/getUserWishlist'
import { useQuery } from '@tanstack/react-query'
import React, { createContext } from 'react'

export const wishlistContext =   createContext<contextData | null>(null)
const ContextWishlistProvider =  ({ children }: { children: React.ReactNode }) => {


  const { data, isLoading, isError, error,refetch  } = useQuery({
    queryKey: ["userWishList"],
    queryFn: getUserWishlist,
  })
  const value: contextData = {
    data,
    isLoading,
    isError, error,refetch,
  }
  return (
    <wishlistContext.Provider value={value}>
      {children}
    </wishlistContext.Provider>
  )
}

export default ContextWishlistProvider
