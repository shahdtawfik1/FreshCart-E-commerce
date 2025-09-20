import { resetPasswordFormType } from "@/schema/resetPassowrd.schema";

export async function resetPasswordAction(values: resetPasswordFormType) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }
  );
  const data = await res.json();
  return data;
}
