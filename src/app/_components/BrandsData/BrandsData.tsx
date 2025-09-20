"use client"
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import BrandAndCategoryCard from '../brandAndCategoryCard/brandAndCategoryCard'
import { brandData } from '@/types/brands.type'

const Brands = ({initData} : {initData:brandData}) => {

  const {data} = useQuery({
    queryKey:["brands"],
    queryFn:()=>initData,
    initialData:initData
  })

  return (
    <section className="py-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Our Brands</h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.data.map(brand => (
          <div 
            key={brand._id} 
            className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl hover:scale-[1.01] transition-transform duration-600"
          >
            <BrandAndCategoryCard check="brands" result={brand}/>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Brands
