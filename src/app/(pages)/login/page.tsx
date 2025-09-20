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
import { toast } from 'react-toastify';
import { useContext, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { loginFormType, loginSchema } from "@/schema/login.schema";
import { signIn } from "next-auth/react"
import { IoIosEyeOff } from "react-icons/io";
import { passwordContext } from "@/context/contextPasswordProvider";
import { IoIosEye } from "react-icons/io";
export default function LogIn() {
  const [isloading, setIsLoading] = useState(false)
  const { showPass,ShowPassandHide }  = useContext(passwordContext)
  // handle form ==================================================================
  const form = useForm<loginFormType>({
    defaultValues: {
      email: "",
      password: "",
    }
    ,
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  })

  // sign up ========================================================================
  async function login(values: loginFormType) {
    setIsLoading(true)
    const res = await signIn("credentials", {
      email: values?.email.toLowerCase(),
      password: values?.password,
      redirect: false,
    })
    if (res?.ok) {
      location.href = "/"
      toast.success("login successfully!", {
        position: "top-right",
        autoClose: 2000,
        theme: "light",
      });
    } else {
      toast.error(res?.error || "Something went wrong"
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
    }
    setIsLoading(false)
  }
  return (
    <main className=" min-h-dvh flex items-center justify-center">
      <section className="w-full  md:w-2/3 mx-auto  px-5 ">
      <h2 className="capitalize text-[1.9rem] text-main font-semibold text-center">sign in</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(login)} className="space-y-8 py-7">
          {/* email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4 gap-0">
                <FormLabel className="mb-[.7rem]">E-mail</FormLabel>
                <FormControl >
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
              <FormItem className="mb-3 gap-0">
                <FormLabel className="mb-[.7rem]">password</FormLabel>
                <FormControl >
                  <section className="relative">
                    {showPass.loginPass =="password"? <IoIosEyeOff onClick={()=>ShowPassandHide("loginPass" )} className="absolute right-[10px] top-[50%] -translate-y-[80%] cursor-pointer" /> : <IoIosEye onClick={()=>ShowPassandHide("loginPass" )} className="absolute right-[10px] top-[50%] -translate-y-[80%] cursor-pointer"/>}
                    <Input className=" mb-3 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)]" type={showPass.loginPass} placeholder="Enter your password" {...field} />
                  </section>
                </FormControl>
                <FormDescription />
                <FormMessage className="bg-[#F8D7DA] px-3 py-1 rounded-[8px] text-[#581528] text-[1rem] border-1 border-[#f7bfc4]" />
              </FormItem>
            )}
          />
          <section className="flex items-center mb-2 gap-3  justify-between">
            <Button disabled={isloading} type="submit" className=" focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)] bg-main cursor-pointer hover:bg-green-500 px-7 capitalize text-[1rem]" >{isloading ? <ScaleLoader height={20}
              width={4} color="#fff" /> : "sign in"}</Button>
            <Link href={"/forgetPassword"} className="text-[#404247] capitalize hover:text-main transition-all duration-300">forget my password ?</Link>
          </section>
          <Link href={"/register"} className="text-[#404247] capitalize hover:text-main transition-all duration-300">create new account ?</Link>
        </form>
      </Form>

      </section>
      <title>Login</title>
    </main>

  )
}