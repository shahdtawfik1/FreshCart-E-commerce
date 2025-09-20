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
import { useRouter } from "next/navigation";
import { resetCodeFormType, resetCodeSchema } from "@/schema/resetCode.schema"
import { SendCodeAction } from "@/Apis/resetCode"

export default function ResetCode() {
    const route = useRouter()
    const [isloading, setIsLoading] = useState(false)
    // handle form ==================================================================
    const form = useForm<resetCodeFormType>({
        defaultValues: {
            resetCode: "",
        }
        ,
        mode: "onTouched",
        resolver: zodResolver(resetCodeSchema),
    })


    // send code  ========================================================================
    async function SendCode(values: resetCodeFormType) {
        try {
            setIsLoading(true)
            const data = await SendCodeAction(values)
            console.log(data);
            if (data.status == "Success") {
               console.log("success")
                toast.success( "success", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "light",
                });
                route.push("/resetPassword")
            }
        } catch {
            toast.error("some thing went wrong"
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
        <main className="w-full  md:w-2/3 mx-auto pt-[5rem] px-5 min-h-[53vh] ">
            <h2 className="capitalize text-[1.7rem] text-main font-semibold text-center">Please enter your email</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(SendCode)} className="space-y-8 py-7 mx-auto">
                    {/* email */}
                    <FormField
                        control={form.control}
                        name="resetCode"
                        render={({ field }) => (
                            <FormItem className="mb-2 gap-0">
                                <FormLabel className="mb-[.7rem]">verification code</FormLabel>
                                <FormControl>
                                    <Input type="number" className=" mb-2 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)]" placeholder="Enter your verification code" {...field} />
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
            <title>reset code</title>
        </main>

    )
}