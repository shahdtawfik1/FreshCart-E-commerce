"use client"
import { addToWishListAction } from "@/wishListAction/addToWishList";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { FaHeart } from "react-icons/fa6";
import { wishlistContext } from "@/context/contextWishListProvider";
import { contextDelete } from './../../../context/contextDeleteWishlist';
const WishList = ({ prop, productId }: { prop: string, productId: string }) => {

  const [loadingIds, setLoadingIds] = useState<string[]>([])
  const { data,refetch } = useContext(wishlistContext)!
  const { mutate: deleteWish, loadingIds: wishListCheck } = useContext(contextDelete)!
  // add to wish cart==========================================================================
  async function addToWishList() {
    setLoadingIds(prev => [...prev, productId])

    return addToWishListAction(productId);
  }
  // handle add to wish=============================================================================
  const queryClinet = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: addToWishList,
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
    onError: (error) => {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    },
    onSettled: () => {
      setLoadingIds(prev => prev.filter(prevId => prevId !== productId))
    }
  })



  // handle icons===================================================================
  const heartData = data?.data?.map(product => product._id)
  let icon;
  const isInWishlist =
     heartData?.includes(productId);

  const isLoading =
    loadingIds.includes(productId) || wishListCheck?.includes(productId);

  if (isLoading) {
    icon = <ClipLoader color="#95989b" size={20} />;
  }
   else if (isInWishlist) {
    icon = (
      <section
        onClick={() => deleteWish(productId)}
        className="text-red-500"
      >
        <FaHeart />
      </section>
    );
  } else {
    icon = <FaRegHeart onClick={() => mutate()} />;
  }

  return (
    <div>
      <section className={`text-main hover:text-green-500 text-[1.4rem] flex justify-center items-center rounded-full  cursor-pointer ${prop} top-[10px] right-[10px]   `}>
        {icon || <FaRegHeart onClick={() => mutate()} />}
      </section>
    </div>
  );
};

export default WishList;
