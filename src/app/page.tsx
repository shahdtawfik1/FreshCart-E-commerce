import homePro from "@/Apis/homeProducts";
import HomeSlider from "./_components/homeSilder/homeSlider";
import HomeData from "./_components/homeData/HomeData";
import CategorySlider from "./_components/categorySlider/CategorySlider";
import CategorySliderDate from "@/Apis/CategorySliderDate";
import { Suspense } from "react";
import Loading from "./_components/loding/Loading";
import { data } from "@/types/product.type";
import type { Metadata } from "next";
import PaymobModal from "./_components/pay/PaymobModal";

export const metadata: Metadata = {
  title: "home",
  description: "e commerve web site you buy what ever you want",
};

export default async function Home() {
  const categorydata = await CategorySliderDate();
  const data:data = await homePro({});
  
  return (
    <main className="pt-[4rem]">  
      <HomeSlider />
      <Suspense fallback={<Loading />}>
        <CategorySlider initData={categorydata} />
        <HomeData initData={data} />
      </Suspense>
      <PaymobModal />
    </main>
  );
}
