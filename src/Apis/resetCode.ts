import { resetCodeFormType } from "@/schema/resetCode.schema";

export async function SendCodeAction(values: resetCodeFormType) {
  const res = await fetch(
    "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
    {
            headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(values),
    }
  );
  const data = await res.json();
  return data;
}
