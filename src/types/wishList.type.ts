import { QueryObserverResult, RefetchOptions, UseMutateFunction } from "@tanstack/react-query";

export interface wishList {
  status: string;
  count: number;
  data: whishlistProduct[];
}

export interface whishlistProduct {
  sold: number;
  images: string[];
  subcategory: Subcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number;
  imageCover: string;
  category: Category;
  brand: Brand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface contextData {
  data:wishList
  isLoading: boolean
  isError: boolean
  error: unknown,
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<wishList, Error>>,
}
export interface wishlistDeleteContext{
    mutate: UseMutateFunction<
      void,  
      unknown,            
      string,             
      unknown            
    >;
    loadingIds:string[],

}
