"use server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getToken() {
  const x =
    (await cookies()).get("__Secure-next-auth.session-token")?.value ||
    (await cookies()).get("next-auth.session-token")?.value;

  const token = await decode({
    token: x,
    secret: process.env.NEXTAUTH_SECRET!,
  });
  return token?.token;
}
