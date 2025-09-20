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
import { useContext, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useRouter } from "next/navigation";
import { resetPasswordFormType, resetPasswordSchema } from "@/schema/resetPassowrd.schema";
import { errorType } from "@/types/registerError.type";
import { IoIosEyeOff } from "react-icons/io";
import { passwordContext } from "@/context/contextPasswordProvider";
import { IoIosEye } from "react-icons/io";
import { resetPasswordAction } from "@/Apis/resetPassword";

export default function ResetPassword() {
    const route = useRouter()
    const [isloading, setIsLoading] = useState(false)
    const { showPass, ShowPassandHide } = useContext(passwordContext)
    // handle form ==================================================================
    const form = useForm<resetPasswordFormType>({
        defaultValues: {
            email: "",
            newPassword: "",
        }
        ,
        mode: "onTouched",
        resolver: zodResolver(resetPasswordSchema),
    })
    // reset password ========================================================================
    async function resetPassword(values: resetPasswordFormType) {
        setIsLoading(true)
        try {
            const data = await resetPasswordAction(values)
            if (data.token) {
                toast.success("password reseted successfully!", {
                    position: "top-right",
                    autoClose: 2000,
                    theme: "light",
                });
                route.push("/login")
            }else{
                   throw new Error(data.message );
            }   
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
        <main className="w-full  md:w-2/3 mx-auto pt-[5rem] px-5 ">
            <h2 className="capitalize text-[1.7rem] text-main font-semibold text-center">reset password</h2>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(resetPassword)} className="space-y-8 py-7">
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
                    {/* password */}
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem className="mb-3 gap-0">
                                <FormLabel className="mb-[.7rem]">password</FormLabel>
                                <FormControl>
                                    <section className="relative">
                                        {showPass.resetPass == "password" ? <IoIosEyeOff onClick={() => ShowPassandHide("resetPass")} className="absolute right-[10px] top-[50%] -translate-y-[80%] cursor-pointer" /> : <IoIosEye onClick={() => ShowPassandHide("resetPass")} className="absolute right-[10px] top-[50%] -translate-y-[80%] cursor-pointer" />}
                                        <Input className=" mb-3 focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)]" type={showPass.resetPass} placeholder="Enter your password" {...field} />
                                    </section>
                                </FormControl>
                                <FormDescription />
                                <FormMessage className="bg-[#F8D7DA] px-3 py-1 rounded-[8px] text-[#581528] text-[1rem] border-1 border-[#f7bfc4]" />
                            </FormItem>
                        )}
                    />
                    <section className="flex items-center mb-2 gap-3">
                        <Button disabled={isloading} type="submit" className=" focus-visible:ring-0 focus-visible:outline-none focus-visible:border-main focus:border-main focus:outline-main focus:shadow-[0_0_0_3px_rgba(34,197,94,0.5)] bg-main cursor-pointer hover:bg-green-500 px-7 capitalize text-[1rem]" >{isloading ? <ScaleLoader height={20}
                            width={4} color="#fff" /> : "reset password"}</Button>
                    </section>

                </form>
            </Form>
            <title>reset password</title>
        </main>

    )
}