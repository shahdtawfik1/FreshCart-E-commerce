"use server"
import { getToken } from "@/utilities/getToken/GetToken";
export async function addToCardAction(id: string) {
  const token = await getToken();
    if(!token){
      throw new Error("login first")
    }
  const values = {
    productId: id,
  };
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    method: "POST",
    headers: {
      token: token as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  });
  const data = await res.json();
  return data;
}
