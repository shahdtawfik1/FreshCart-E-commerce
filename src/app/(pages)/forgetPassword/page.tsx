"use client"

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
import { forgetPasswordFormType, forgetPasswordSchema } from "@/schema/forgetPasword.schema";
import { useRouter } from "next/navigation";
import { forgetPasswordAction } from "@/Apis/forgetPassword"
import { ForgetError } from "@/types/forgetError"


export default function ResetPassword() {
    const route = useRouter()
    const [isloading, setIsLoading] = useState(false)
    // handle form ==================================================================
    const form = useForm<forgetPasswordFormType>({
        defaultValues: {
            email: "",
        }
        ,
        mode: "onTouched",
        resolver: zodResolver(forgetPasswordSchema),
    })


    // forget password ========================================================================
    async function forgetPassword(values: forgetPasswordFormType) {
        setIsLoading(true)
        try {
            const data = await forgetPasswordAction(values)
            if (data.statusMsg == "success") {
                toast.success(data.message
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
                route.push("/resetCode")
            }else{
                throw new Error(data.message)
            }
        } catch(err) {
           const error = err as ForgetError
            toast.error(error.message ||"something went wrong"
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
        <main className="w-full  md:w-2/3 mx-auto pt-[5rem] px-5 min-h-[53vh]">
            <h2 className="text-center mb-5 relative capitalize text-4xl font-semibold ">Please enter your email</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(forgetPassword)} className="space-y-8 py-7">
                    {/* email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem className="mb-2 gap-0">
                                <FormLabel className="mb-[.7rem]">E-mail</FormLabel>
                                <FormControl>
                                    <Input className=" mb-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)]" type="email" placeholder="Enter your email" {...field} />
                                </FormControl>
                                <FormDescription />
                                <FormMessage className="bg-[#F8D7DA] px-3 py-1 rounded-[8px] text-[#581528] text-[1rem] border-1 border-[#f7bfc4]" />
                            </FormItem>
                        )}
                    />
                    <section className="flex items-center mb-2 gap-3">
                        <Button disabled={isloading} type="submit" className="  focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)] bg-main cursor-pointer hover:bg-green-500 px-7 capitalize text-[1rem]" >{isloading ? <ScaleLoader height={20}
                            width={4} color="#fff" /> : "send"}</Button>
                    </section>
                </form>
            </Form>
            <title>forget password</title>
        </main>

    )
}