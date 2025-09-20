"use server"
import { getToken } from "@/utilities/getToken/GetToken";
export async function getUserCartAction() {
  const token = await getToken();
      if(!token){
      throw new Error("login first")
    }
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
    headers: {
      token: token as string,
    },
  });
 const data = await  res.json();
  return data
}
