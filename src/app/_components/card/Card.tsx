"use client";

import Link from "next/link";
import React, { useContext, useTransition } from "react";
import { FaStar } from "react-icons/fa6";
import WishList from "../wishList/WishList";
import sale from "@/assets/images/sale.png";
import Image from "next/image";
import { prodcut } from "@/types/product.type";
import { Button } from "@/components/ui/button"; 
import { contextAddToCard } from '@/context/ContextAddToCardProvider';

// Define a lightweight error type
interface ApiError {
  message?: string
}

const MyCard = ({ product }: { product: prodcut }) => {
  const { mutate } = useContext(contextAddToCard)!;
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    startTransition(async () => {
      try {
        mutate(product._id);
      } catch (err) {
        const error = err as ApiError;
        console.error(error.message ?? error);
      }
    });
  };

  return (
    <section className="relative overflow-hidden rounded-2xl bg-card shadow-md ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-main/60 group">
      {/* Sale badge */}
      {product.priceAfterDiscount != 0 && product.priceAfterDiscount && (
        <Image
          src={sale}
          alt="sale"
          className="w-[100px] absolute -top-6 -left-6 drop-shadow-[0_2px_6px_rgba(0,0,0,0.25)] rotate-[-10deg]"
        />
      )}

      {/* Image + Link */}
      <Link href={`/prodcutDetails/${product._id}`}>
        <Image
          className="w-[75%] mx-auto sm:w-full h-[280px] object-cover transition-transform duration-300 group-hover:scale-105"
          src={product.imageCover}
          alt={product.title}
          width={500}
          height={500}
        />

        <section className="px-4 py-3 space-y-2">
          <h3 className="text-main capitalize text-sm font-semibold">
            {product.category.name}
          </h3>
          <h2 className="text-gray-800 line-clamp-1 text-lg font-bold">
            {product.title}
          </h2>

          {/* Price + Rating */}
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {product.priceAfterDiscount != 0 && product.priceAfterDiscount && (
                <p className="font-bold text-green-600">
                  {product.priceAfterDiscount} EGP
                </p>
              )}
              <p
                className={`text-sm ${
                  product.priceAfterDiscount ? "line-through" : "text-green-600"
                } ${product.priceAfterDiscount ? "font-normal text-gray-500" : "font-bold"}`}
              >
                {product.price} EGP
              </p>
            </div>

            <div className="flex items-center gap-1 text-xs text-gray-700 bg-secondary/80 rounded-full px-2 py-1">
              <FaStar className="text-yellow-400" />
              <span>{product.ratingsAverage}</span>
            </div>
          </section>
        </section>
      </Link>

      {/* Add to Cart Button */}
      <div className="px-4 pb-4">
        <Button
          className="w-full opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-main hover:cursor-pointer"
          variant="default"
          onClick={handleAddToCart}
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add to Cart"}
        </Button>
      </div>

      {/* Wishlist */}
      <WishList prop={"absolute"} productId={product.id} />
    </section>
  );
};

export default MyCard;
