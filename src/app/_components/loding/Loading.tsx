import React from 'react'
import { ScaleLoader } from 'react-spinners'

const Loading = () => {
  return (
    <div>
      <section className="flex justify-center items-center h-screen"><ScaleLoader
  color="#0AAD0A"
  height={50}
  width={4}
/></section>
    </div>
  )
}

export default Loading
