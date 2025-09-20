
"use client"
import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import BrandAndCategoryCard from '../brandAndCategoryCard/brandAndCategoryCard'
import Loading from '../loding/Loading'
import { categoryData } from '@/types/category.type'

const CategoryData = ({initData} : {initData:categoryData}) => {
  const [loading,setLoading] = useState(true)
  const {data} = useQuery({
    queryKey:["category"],
    queryFn:()=>initData,
    initialData:initData,
  })
  useEffect(()=>{
    if(initData){
      setLoading(false)
    }
  },[initData])
  if(loading){
    return <Loading/>
  }
  return (
    <>
      <section className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-4  py-7'>
    {data.data.map(category => <BrandAndCategoryCard check={"category"} key={category._id} result={category} />)}


      </section>
    </>
  )
}

export default CategoryData
