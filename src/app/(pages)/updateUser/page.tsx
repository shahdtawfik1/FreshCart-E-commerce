"use client"
import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import axios from "axios"
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
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { updateUserFormType, updateUserSchema } from '@/schema/updateUser.schema'
import { getToken } from '@/utilities/getToken/GetToken'
import { useSession } from "next-auth/react"

const UpdateUser = () => {
  const [isloading, setIsLoading] = useState(false)
  const { data: session, update } = useSession();
  // handle form ==================================================================
  const form = useForm<updateUserFormType>({
    defaultValues: {
      name: "",
      email: "",
      phone: ""
    }
    ,
    mode: "onTouched",
    resolver: zodResolver(updateUserSchema),
  })
  // update user ========================================================
  async function updateUser(values: updateUserFormType) {
    setIsLoading(true)
    const token = await getToken();
    try {
      const { data } = await axios.put("https://ecommerce.routemisr.com/api/v1/users/updateMe/", values, {
        headers: {
          token: token as string
        }
      })
      console.log(data)
      if (data.message == "success") {
        await update({
          user: {
            ...session?.user,
            name: data.user.name,
            email: data.user.email
          }
        })
        toast.success(data.message, {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        });
        form.reset({
          name: "",
          email: "",
          phone: ""
        })
      }
    } catch {
      toast.error("some thing went wrong",
        {
          position: "top-right",
          autoClose: 2000,
          theme: "light",
        }
      );
    } finally {
      setIsLoading(false)
    }

  }
  return (
    <main className="w-full  md:w-2/3 mx-auto pt-[5rem] px-5 ">
      <h2 className="text-center mb-5 relative capitalize text-4xl font-semibold ">update user</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(updateUser)} className="space-y-8 py-7">
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
              width={4} color="#fff" /> : "update"}</Button>
          </section>
        </form>
      </Form>
      <title>update user</title>
    </main>
  )
}


export default UpdateUser