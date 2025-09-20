"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";
import logo from "@/assets/images/freshcart-logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiMiniBars3 } from "react-icons/hi2";
import { GoX } from "react-icons/go";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Avatar } from "@radix-ui/react-avatar";
import { FaRegUser, FaKey } from "react-icons/fa6";
import { SyncLoader, ScaleLoader } from "react-spinners";
import { LuUser } from "react-icons/lu";
import { Badge } from "@/components/ui/badge";
import { cartContext } from "@/context/contextCartProvider";
import { wishlistContext } from "@/context/contextWishListProvider";
import { FiShoppingCart, FiHeart, } from "react-icons/fi";


const Navbar = () => {
  const pathName = usePathname();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: session, status } = useSession();
  const { data } = useContext(cartContext)!;
  const { data: wishData } = useContext(wishlistContext)!;

  // nav links
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Products" },
    { href: "/brands", label: "Brands" },
    { href: "/category", label: "Category" },
    { href: "/allorders", label: "Orders" },
  ];

  // log out
  async function logOut() {
    setLoading(true);
    await signOut({ callbackUrl: "/login" });
    setLoading(false);
  }

  return (
    <nav className="backdrop-blur supports-[backdrop-filter]:bg-[#F0F3F2]/80 bg-[#F0F3F2] fixed top-0 left-0 right-0 z-20 border-b border-border">
      <section className="w-full max-w-7xl pl-4   mx-auto flex flex-wrap md:flex-nowrap items-center justify-between py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src={logo}
            alt="fresh cart logo"
            className="w-[140px] sm:w-[150px]"
          />
        </Link>

        {/* Right side */}
        <section className="flex md:order-2 items-center gap-3">
          {status === "loading" && (
            <SyncLoader color="#a1a1a1" margin={3} size={9} />
          )}

          {/* Authenticated */}
          {status === "authenticated" && (
            <>
              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-1 text-[1.5rem] text-[#404247] hover:scale-110 transition-transform"
              >
                {data?.numOfCartItems > 0 && (
                  <Badge className="absolute -top-1 -left-1 w-4 h-4 flex items-center justify-center rounded-full bg-red-600 text-[10px]">
                    {data?.numOfCartItems}
                  </Badge>
                )}
                <FiShoppingCart />
              </Link>

              {/* Wishlist */}
              <Link
                href="/wishList"
                className="relative p-1 text-[1.5rem] text-[#404247] hover:scale-110 transition-transform"
              >
                {wishData?.count > 0 && (
                  <Badge className="absolute -top-1 -left-1 w-4 h-4 flex items-center justify-center rounded-full bg-red-600 text-[10px]">
                    {wishData?.count}
                  </Badge>
                )}
                <FiHeart />
              </Link>

              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="w-[40px] h-[40px] cursor-pointer flex items-center justify-center bg-gray-100 rounded-full">
                    <FaRegUser className="text-[1.5rem] text-[#404247]" />
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-md p-3 rounded-lg min-w-[170px] mt-2">
                  <h3 className="text-center text-sm mb-2">
                    Hi,{" "}
                    <span className="text-main font-semibold">
                      {session.user.name}
                    </span>
                  </h3>
                  <Link
                    href="/updateUser"
                    className="flex items-center gap-2 py-2 px-2 rounded-md hover:bg-main hover:text-white transition-colors"
                  >
                    <LuUser /> Update Profile
                  </Link>
                  <Link
                    href="/changePassword"
                    className="flex items-center gap-2 py-2 px-2 rounded-md hover:bg-main hover:text-white transition-colors"
                  >
                    <FaKey /> Change Password
                  </Link>
                  <button
                    type="button"
                    onClick={logOut}
                    className="w-full text-left flex items-center gap-2 py-2 px-2 rounded-md hover:bg-red-500 hover:text-white transition-colors"
                  >
                    {loading ? (
                      <ScaleLoader height={20} width={2} color="#0AAD0A" />
                    ) : (
                      "Log Out"
                    )}
                  </button>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setOpen(!open)}
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-[2rem] cursor-pointer text-gray-600 md:hidden"
              >
                {open ? <GoX /> : <HiMiniBars3 />}
              </button>
            </>
          )}

          {/* Guest */}
          {status === "unauthenticated" && (
            <>
              <Link
                href="/login"
                className={`${
                  pathName === "/login" && "text-main font-semibold"
                } px-3 py-1 hover:text-main transition-colors`}
              >
                Login
              </Link>
              <Link
                href="/register"
                className={`${
                  pathName === "/register" && "text-main font-semibold"
                } px-3 py-1 hover:text-main transition-colors`}
              >
                Register
              </Link>
            </>
          )}
        </section>

        {/* Nav Links */}
        {status === "authenticated" && (
          <section
            className={`w-full md:w-auto md:flex md:items-center md:order-1 transition-all duration-300 ${
              open
                ? "max-h-[300px] opacity-100"
                : "max-h-0 opacity-0 md:max-h-none md:opacity-100"
            } overflow-hidden md:overflow-visible`}
          >
            <ul className="flex flex-col md:flex-row md:space-x-6 lg:space-x-8 mt-3 md:mt-0">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block py-2 md:py-0 text-[1rem] transition-colors ${
                      pathName === link.href ||
                      (link.href !== "/" && pathName.startsWith(link.href))
                        ? "text-main font-semibold"
                        : "text-[#404247] hover:text-main"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
