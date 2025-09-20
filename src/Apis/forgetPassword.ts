import { forgetPasswordFormType } from "@/schema/forgetPasword.schema";

export async function forgetPasswordAction(values: forgetPasswordFormType) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
  const data = await res.json();
  return data;
}