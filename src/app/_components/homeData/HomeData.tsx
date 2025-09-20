"use client";
import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import MyCard from "./../card/Card";
import { toast } from "react-toastify";
import ErrorMessage from "../error/Error";
import { data } from "@/types/product.type";
const HomeData = ({ initData } :{ initData:data}) => {

    // cache data=======================================================
  const { data } : {data:data} = useQuery({
    queryKey: ["products"],
    queryFn: () => initData,
    initialData: initData,
  });
  // error toast============================================
  useEffect(() => {
    if (data?.message) {
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
  }, [data]);



if(data.message){
  return<main className='min-h-dvh flex justify-center items-center'> <ErrorMessage/></main>
}

  return (
    <main >
      <section className="w-full md-[85%] px-3 md:px-7 lg:px-10 my-5 py-7">
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xxl:grid-cols-5  gap-4 pt-7">
          {data?.data?.map((product) => (
            <MyCard product={product} key={product._id} />
          ))}
        </section>
      </section>
    </main>
  );
};

export default HomeData;
