"use client"
import React, { useContext } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
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
import { useState } from "react";
import { ScaleLoader } from "react-spinners";
import { changePasswordFormType, changePasswordSchema } from '@/schema/changePassword.schema'
import axios from "axios"
import { getToken } from '@/utilities/getToken/GetToken'
import { IoIosEyeOff } from "react-icons/io";
import { passwordContext } from "@/context/contextPasswordProvider";
import { IoIosEye } from "react-icons/io";
import { signOut } from "next-auth/react"

const UpdateUser = () => {
    const [isloading, setIsLoading] = useState(false)
    const { showPass, ShowPassandHide } = useContext(passwordContext)

    // handle form ==================================================================
    const form = useForm<changePasswordFormType>({
        defaultValues: {
            currentPassword: "",
            password: "",
            rePassword: ""
        }
        ,
        mode: "onTouched",
        resolver: zodResolver(changePasswordSchema),
    })
    // update user ========================================================
    async function updateUser(values: changePasswordFormType) {
        setIsLoading(true)
        const token = await getToken();
        try {
            const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`, values, {
                headers: {
                    token: token as string
                }
            })
            if (data.message == "success") {
                toast.success(data.message, {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "light",
                });
                form.reset({
                    currentPassword: "",
                    password: "",
                    rePassword: ""
                })
                await signOut({
                    callbackUrl: "/login"
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
            <h2 className="text-center mb-5 relative capitalize text-4xl font-semibold ">change password</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(updateUser)} className="space-y-8 py-7">
                    {/* old password */}
                    <FormField
                        control={form.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem className="mb-1 gap-0">
                                <FormLabel className="mb-[.7rem]">old password</FormLabel>
                                <FormControl>
                                    <section className="relative">
                                        {showPass.currentPass == "password" ? <IoIosEyeOff onClick={() => ShowPassandHide("currentPass")} className="absolute right-[10px] top-[50%] -translate-y-[80%] cursor-pointer" /> : <IoIosEye onClick={() => ShowPassandHide("currentPass")} className="absolute right-[10px] top-[50%] -translate-y-[80%] cursor-pointer" />}
                                        <Input className=" mb-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)]" type={showPass.currentPass} placeholder="Enter your old password" {...field} />
                                    </section>
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
                                <FormLabel className="mb-[.7rem]">new password</FormLabel>
                                <FormControl>
                                    <section className="relative">
                                        {showPass.newPass == "password" ? <IoIosEyeOff onClick={() => ShowPassandHide("newPass")} className="absolute right-[10px] top-[50%] -translate-y-[80%] cursor-pointer" /> : <IoIosEye onClick={() => ShowPassandHide("newPass")} className="absolute right-[10px] top-[50%] -translate-y-[80%] cursor-pointer" />}
                                        <Input className=" mb-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)]" type={showPass.newPass} placeholder="Enter your new password" {...field} />
                                    </section>
                                </FormControl>
                                <FormDescription />
                                <FormMessage className="bg-[#F8D7DA] px-3 py-1 rounded-[8px] text-[#581528] text-[1rem] border-1 border-[#f7bfc4]" />
                            </FormItem>
                        )}
                    />
                    {/* repassowed */}

                    <FormField
                        control={form.control}
                        name="rePassword"
                        render={({ field }) => (
                            <FormItem className="mb-1 gap-0">
                                <FormLabel className="mb-[.7rem]">confirm password</FormLabel>
                                <FormControl>
                                    <section className="relative">
                                        {showPass.confirmPass == "password" ? <IoIosEyeOff onClick={() => ShowPassandHide("confirmPass")} className="absolute right-[10px] top-[50%] -translate-y-[80%] cursor-pointer" /> : <IoIosEye onClick={() => ShowPassandHide("confirmPass")} className="absolute right-[10px] top-[50%] -translate-y-[80%] cursor-pointer" />}

                                        <Input className=" mb-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)]" type={showPass.confirmPass} placeholder="confirm password" {...field} />
                                    </section>
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
            <title>change password</title>
        </main>
    )
}

export default UpdateUser
