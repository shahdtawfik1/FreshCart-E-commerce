"use server"
import { getToken } from "@/utilities/getToken/GetToken";
export async function deleteSpacificProductAction(id: string) {
  const token = await getToken();
      if(!token){
        throw new Error("login first")
      }
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
    method: "DELETE",
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}
