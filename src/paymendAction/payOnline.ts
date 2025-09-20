import axios from "axios";
import { orderFormType } from "@/schema/order.schema";
import { getToken } from "@/utilities/getToken/GetToken";
export async function payOnlineAction(id: string, values: orderFormType) {
  const token = await getToken();
  const { data } = await axios.post(
    `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${location.origin}`,
    values,
    {
      headers: {
        token: token as string,
      },
    }
  );
  return data;
}
