import React from 'react'
import notFound from "./../assets/images/404.jpg"
import Image from 'next/image'
const NotFound = () => {
  return (
    <main className='min-h-dvh flex items-center justify-center'>
      <Image src={notFound} alt={"page not found"}/>
    </main>
  )
}

export default NotFound
