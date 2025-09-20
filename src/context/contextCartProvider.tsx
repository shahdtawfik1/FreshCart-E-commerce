"use client"
import { getUserCartAction } from '@/cardActions/getUserCart'
import {  valueShareType } from '@/types/cartContext.type'
import { useQuery } from '@tanstack/react-query'
import React, { createContext } from 'react'

export const cartContext =   createContext<valueShareType | null>(null)
const ContextCartProvider =  ({ children }: { children: React.ReactNode }) => {

  const { data, isLoading, isError, error,refetch } = useQuery({
    queryKey: ["userCart"],
    queryFn: getUserCartAction,
  })
  const value: valueShareType = {
    data,
    isLoading,
    isError, error,refetch
  }
  return (
    <cartContext.Provider value={value}>
      {children}
    </cartContext.Provider>
  )
}

export default ContextCartProvider
