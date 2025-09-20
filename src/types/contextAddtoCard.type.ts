import { UseMutateFunction } from "@tanstack/react-query";

// types/cart.type.ts
export interface CartProduct {
  count: number;
  _id: string;
  product: string;
  price: number;
}

export interface CartData {
  _id: string;
  cartOwner: string;
  products: CartProduct[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  totalCartPrice: number;
}

export interface AddToCartResponse {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: CartData;
}
export interface AddToCartContextType {
  mutate: UseMutateFunction<
    void,  
    unknown,            
    string,             
    unknown            
  >;
  loadingIds?:string[],
}