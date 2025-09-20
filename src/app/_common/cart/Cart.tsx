"use client"
import { contextAddToCard } from "@/context/ContextAddToCardProvider";
import React, { useContext } from "react";
import { MdAddShoppingCart } from "react-icons/md";
import { ClipLoader } from "react-spinners";



const Cart = ({id}:{id:string}) => {

  const {mutate,loadingIds} = useContext(contextAddToCard)!

  return (
    <section>
      <section onClick={()=>mutate(id)} className="text-white w-[40px] hover:bg-green-500 h-[40px] flex items-center justify-center absolute bottom-[10px] right-[10px] rounded-full text-[1.5rem] cursor-pointer   transition-all duration-300  bg-main">
        {loadingIds?.includes(id) ? <ClipLoader color="#fff" size={20} />: <MdAddShoppingCart />}
      </section>
    </section>
  );
};

export default Cart;
