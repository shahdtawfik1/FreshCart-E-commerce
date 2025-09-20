"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import Link from "next/link";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterFormType, registerSchema } from "@/schema/register";
import { toast } from 'react-toastify';
import { errorType } from "@/types/registerError.type";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { IoIosEyeOff } from "react-icons/io";
import { passwordContext } from "@/context/contextPasswordProvider";
import { IoIosEye } from "react-icons/io";

export default function Register() {
  const [isloading, setIsLoading] = useState(false)
  const route = useRouter()
  const { showPass, ShowPassandHide } = useContext(passwordContext)
  // handle form ==================================================================
  const form = useForm<RegisterFormType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    }
    ,
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  })


  // sign up ========================================================================
  async function register(values: RegisterFormType) {
    try {
      setIsLoading(true)
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }
      toast.success("Account created successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
      route.push("/login")
    } catch (err) {
      const error = err as errorType;
      toast.error(error.message || "Something went wrong"
        , {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <main className=" min-h-dvh flex pt-[4.5rem] items-center justify-center">
      <section className="w-full  md:w-2/3 mx-auto px-5">
        <h2 className="capitalize text-[1.9rem] text-main font-semibold text-center">register now</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(register)} className="space-y-8 py-7">
            {/* user name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-1 gap-0 ">
                  <FormLabel className="mb-[.7rem]">Username</FormLabel>
                  <FormControl>
                    <Input type="text" className="mb-2  focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)]" placeholder="Enter your name" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage className="bg-[#F8D7DA] px-3 py-1 rounded-[8px] text-[#581528] text-[1rem] border-1 border-[#f7bfc4]" />
                </FormItem>
              )}
            />
            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-1 gap-0">
                  <FormLabel className="mb-[.7rem]">E-mail</FormLabel>
                  <FormControl>
                    <Input className=" mb-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)]" type="email" placeholder="Enter your email" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage className="bg-[#F8D7DA] px-3 py-1 rounded-[8px] text-[#581528] text-[1rem] border-1 border-[#f7bfc4]" />
                </FormItem>
              )}
            />
            {/* password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-1 gap-0">
                  <FormLabel className="mb-[.7rem]">password</FormLabel>
                  <FormControl>
                    <section className="relative">
                      {showPass.password == "password" ? <IoIosEyeOff onClick={() => ShowPassandHide("password")} className="absolute right-[10px] top-[50%] -translate-y-[80%] cursor-pointer" /> : <IoIosEye onClick={() => ShowPassandHide("password")} className="absolute right-[10px] top-[50%] -translate-y-[80%] cursor-pointer" />}
                    <Input className=" mb-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)]" type={showPass.password} placeholder="Enter your password" {...field} />
                    </section>
                  </FormControl>
                  <FormDescription />
                  <FormMessage className="bg-[#F8D7DA] px-3 py-1 rounded-[8px] text-[#581528] text-[1rem] border-1 border-[#f7bfc4]" />
                </FormItem>
              )}
            />
            {/* repassword */}
            <FormField
              control={form.control}
              name="rePassword"
              render={({ field }) => (
                <FormItem className="mb-1 gap-0">
                  <FormLabel className="mb-[.7rem]">rePassword</FormLabel>
                  <FormControl>
                    <section className="relative">
                      {showPass.repassword == "password" ? <IoIosEyeOff onClick={() => ShowPassandHide("repassword")} className="absolute right-[10px] top-[50%] -translate-y-[80%] cursor-pointer" /> : <IoIosEye onClick={() => ShowPassandHide("repassword")} className="absolute right-[10px] top-[50%] -translate-y-[80%] cursor-pointer" />}
                      <Input className=" mb-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)]" type={showPass.repassword} placeholder="Enter your RePassword" {...field} />
                    </section>
                  </FormControl>
                  <FormDescription />
                  <FormMessage className="bg-[#F8D7DA] px-3 py-1 rounded-[8px] text-[#581528] text-[1rem] border-1 border-[#f7bfc4]" />
                </FormItem>
              )}
            />
            {/* phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="mb-1 gap-0">
                  <FormLabel className="mb-[.7rem]">phone</FormLabel>
                  <FormControl>
                    <Input className=" mb-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)]" type="tel" placeholder="Enter your phone" {...field} />
                  </FormControl>
                  <FormDescription />
                  <FormMessage className="bg-[#F8D7DA] px-3 py-1 rounded-[8px] text-[#581528] text-[1rem] border-1 border-[#f7bfc4]" />
                </FormItem>
              )}
            />
            <section className="flex items-center gap-3">
              <Button disabled={isloading} type="submit" className=" focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)] bg-main cursor-pointer hover:bg-green-500 px-7 capitalize text-[1rem]" >{isloading ? <ScaleLoader height={20}
                width={4} color="#fff" /> : "register"}</Button>
              <Link href={"/login"} className="text-[#404247] capitalize hover:text-main transition-all duration-300">already have an account ?</Link>
            </section>
          </form>
        </Form>
      </section>
      <title>register</title>
      </main>
    </>
  )
}