"use client"
import React from "react";
import Image from "next/image";
import amirican from "@/assets/images/American-Express-Color-BA04NtD8.png";
import master from "@/assets/images/mastercard-DpLisAk5.webp";
import payPal from "@/assets/images/paypal-f_p-vrjl.png";
import googlePlay from "@/assets/images/get-google-play-BORhnNzJ.png";
import Apple from "@/assets/images/get-apple-store-9A-0RbJo.png";
const Footer = () => {
  return (
    <main className={` left-0 bg-[#F0F3F2] py-[2rem]`}>
      <section className="  w-full md-[85%] px-3 md:px-7 lg:px-10">
        <section className="link mb-[1.4rem] relative  after:bg-gray-300 after:w-full after:h-[1px] after:absolute after:bottom-[-20px] after:left-[0]">
          {/* text */}
          <section className="mb-4">
            <h2 className="text-[1.3rem] capitalize mb-2">
              Get the FreshCart app
            </h2>
            <p className="capitalize font-[300] text-gray-500">
              We will send you a link, open it in your phone to download the
              app.
            </p>
          </section>
          {/* form */}
          <form className="input-box flex flex-wrap itema-center gap-2.5">
            <input
              type="email"
              placeholder="E-mail"
              name="email"
              className="grow bg-white border-1 outline-0 py-1 px-5"
            />
            <button
              className="bg-main text-white p-2 rounded-[8px] capitalize"
              type="button"
            >
              share app link
            </button>
          </form>
        </section>
        {/* payment tools */}
        <section className="flex flex-wrap justify-between items-center">
          <section className="pay flex gap-4 py-[1.2rem]">
            <h3>Payment Partners</h3>
            <ul className="flex flex-wrap gap-3">
              <li className="w-[50px]">
                <Image src={amirican} alt="amirican" className="w-full" />
              </li>
              <li className="w-[40px]">
                <Image src={master} alt="amirican" className="w-full" />
              </li>
              <li className="w-[50px]">
                <Image src={payPal} alt="amirican" className="w-full" />
              </li>
            </ul>
          </section>

          <section className="flex flex-wrap items-center gap-2">
            <h3 className="capitalize text-[1.1rem]">Get deliveries with FreshCart</h3>
            <figure className="w-[100px]">
            <Image src={googlePlay} alt="google play" className="w-full"/>
            </figure>
            <figure className="w-[100px]">
            <Image src={Apple} alt="google play" className="w-full"/>
            </figure>
          </section>
        </section>
      </section>
    </main>
  );
};

export default Footer;
