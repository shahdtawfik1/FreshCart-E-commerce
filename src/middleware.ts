import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;
  const authPages = [
    "/login",
    "/register",
    "/resetCode",
    "/resetPassword",
    "/forgetPassword",
  ];
  const routes = [
    "/",
    "/products",
    "/brands",
    "/category",
    "/cart",
    "/wishList",
    "/orders",
    "/account",
    "/brandDetails",
    "/productDetails",
    "/categoryDetails",
    "/updateUser",
     "/changePassword",
     "/payment",
     "/allorders"
  ];

  if (!token && routes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (token && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/",
    "/products",
    "/brands",
    "/category",
    "/cart",
    "/wishList",
    "/orders",
    "/account",
    "/login",
    "/register",
    "/resetCode",
    "/resetPassword",
    "/forgetPassword",
    "/brandDetails",
    "/productDetails",
    "/categoryDetails",
    "/updateUser",
    "/changePassword",
    "/payment",
    "/allorders"
  ],
};
