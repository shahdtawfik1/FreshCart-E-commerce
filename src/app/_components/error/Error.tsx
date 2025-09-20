import React from "react";
import errorImage from "@/assets/images/error.webp"
import Image from 'next/image';
const ErrorMessage = () => {
  return (
    <>
      <section>
        <Image src={errorImage} alt="image error w-[200px] h-[200px]" />
        <p className="text-[#203E76] capitalize text-center text-[1.3rem] font-medium">
          some thing went wrong
        </p>
      </section>
    </>
  );
};

export default ErrorMessage;
