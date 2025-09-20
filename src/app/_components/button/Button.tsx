"use client"
import { contextAddToCard } from '@/context/ContextAddToCardProvider'
import React, { useContext } from 'react'
import { ScaleLoader } from "react-spinners";
const Button = ({id}:{id:string}) => {
const {mutate,loadingIds} = useContext(contextAddToCard)!



  return (
    <section onClick={()=>mutate(id)}>
          <button type='button' className='bg-main px-8 py-2 rounded-xl text-white capitalize cursor-pointer hover:bg-green-500 transition-all duration-300'>
             { loadingIds?.includes(id)? <ScaleLoader height={20}
              width={3} color="#fff" />  : "add to cart"}
            </button>
    </section>
  )
}

export default Button
