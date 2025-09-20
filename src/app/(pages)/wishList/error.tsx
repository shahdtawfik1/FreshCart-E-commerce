"use client"
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import ErrorMessage from './../../../app/_components/error/Error';

const Error = ({error}:{error:string}) => {
  useEffect(() => {
    if (error) {
      toast.error("some thing went wrong", {
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
  }, [error]);
  return (
    <main className='min-h-dvh flex justify-center items-center'>
      <ErrorMessage/>
    </main>
  )
}

export default Error
