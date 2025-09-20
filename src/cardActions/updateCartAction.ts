"use server"
import { getToken } from "@/utilities/getToken/GetToken";
export async function updateCartProductAction(id: string,count:number) {
  const token = await getToken();
      if(!token){
      throw new Error("login first")
    }
  const value = {
    count: count
}
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "PUT",
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
    body:JSON.stringify(value)
  });
  const data = await res.json();
  return data;
}
