"use server"

import { getToken } from "@/utilities/getToken/GetToken";
import { jwtDecode } from "jwt-decode";

export default async function getOrder() {


    const token = await getToken()
    const {id} : {id:string} = jwtDecode(token as string)
  try{
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);

    return res.json();
  }catch{
    throw new Error("something went wrong")
  }
}
