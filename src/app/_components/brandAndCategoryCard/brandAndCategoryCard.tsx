import { brands } from "@/types/brands.type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BrandAndCategoryCard = ({
  result,
  check,
}: {
  result: brands;
  check: string;
}) => {
  return (
    <Link
      href={
        check === "brands"
          ? `/brandDetails/${result._id}`
          : `/categoryProducts/${result._id}`
      }
      className="bg-[#F9FAFB] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer hover:-translate-y-1 h-[full] "
    >
      <figure className="overflow-hidden">
        <Image
          width={500}
          height={500}
          src={result.image}
          alt={result.slug}
          className="w-full max-h-[350px] object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </figure>
      <figcaption className="p-3">
        <p className="text-center text-base font-semibold text-gray-800 capitalize group-hover:text-main transition-colors">
          {result.name}
        </p>
      </figcaption>
    </Link>
  );
};

export default BrandAndCategoryCard;
