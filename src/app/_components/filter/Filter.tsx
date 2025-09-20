"use client";
import React, {  useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import { categoryData } from "@/types/category.type";
import { brandData } from "@/types/brands.type";
import { useRouter, useSearchParams } from "next/navigation";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
const Filter = ({
  category,
  brandsData,
  startTransition
}: {
  category: categoryData;
  brandsData: brandData,
  startTransition: React.TransitionStartFunction
}) => {
  // left the search to url======================================================
  const router = useRouter();
  const searchParams = useSearchParams();
  const [price, setPrice] = useState<number>(100);
  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    if(key !="page"){
      params.delete("page")
    }
  startTransition(() => {
    router.push(`/products?${params.toString()}`);
  })
  }
  const PrettoSlider = styled(Slider)({
    color: '#52af77',
    height: 8,
    overflow:"visible",
    '& .MuiSlider-track': {
      border: 'none',
    },
    '& .MuiSlider-thumb': {
      height: 24,
      width: 24,
      backgroundColor: '#fff',
      border: '2px solid currentColor',
      '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
        boxShadow: 'inherit',
      },
      '&::before': {
        display: 'none',
      },
    },
    '& .MuiSlider-valueLabel': {
      display:"none"
  }});

  const handleChange = (_: Event | React.SyntheticEvent<Element, Event>, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setPrice(newValue);
      updateQuery("price[lte]", `${newValue}`);
    }
  };
  // handle slider value========================
  return (
    <>
      <section className="flex items-center flex-wrap justify-center gap-7 ">
        <DropdownMenu>
          <DropdownMenuTrigger className=" capitalize p-4 py-2 rounded-[10px] border-1 border-main flex items-center gap-4 cursor-pointer text-main">
            sort <IoIosArrowDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="px-2 py-1">
            <DropdownMenuItem
              onClick={() => updateQuery("sort", "price")}
              className="text-main hover:!text-main cursor-pointer capitalize text-[1rem]"
            >
              small to big
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => updateQuery("sort", "-price")}
              className="text-main hover:!text-main cursor-pointer capitalize text-[1rem]"
            >
              big to small
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className=" capitalize p-4 py-2 rounded-[10px] border-1 border-main flex items-center gap-4 cursor-pointer text-main">
            price <IoIosArrowDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="  px-2 py-1">
            <DropdownMenuItem
              className="text-main hover:!text-main cursor-pointer capitalize text-[1rem] w-[250px] "
            >
              <p>{price}</p>
              <PrettoSlider
                valueLabelDisplay="auto"
                aria-label="pretto slider"
                min={0}
                max={10000}
                defaultValue={price}
                onChangeCommitted={handleChange}
              />
              <p>10K</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className=" capitalize p-4 py-2 rounded-[10px] border-1 border-main flex items-center gap-4 cursor-pointer text-main">
            Categories <IoIosArrowDown />
          </DropdownMenuTrigger>

          <DropdownMenuContent className="   px-2 py-1">
            <DropdownMenuItem
              onClick={() => updateQuery("category", "")}
              className="text-main hover:!text-main cursor-pointer capitalize text-[1rem]"
            >
              All
            </DropdownMenuItem>
            {category.data.map((category) => (
              <DropdownMenuItem
                onClick={() => updateQuery("category[in]", category._id)}
                key={category._id}
                className="text-main hover:!text-main cursor-pointer capitalize text-[1rem]"
              >
                {category.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>



        <DropdownMenu>
          <DropdownMenuTrigger className=" capitalize p-4 py-2 rounded-[10px] border-1 border-main flex items-center gap-4 cursor-pointer text-main">
            Brands <IoIosArrowDown />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="   px-2 py-1">
            <DropdownMenuItem
              onClick={() => updateQuery("brand", "")}
              className="text-main hover:!text-main cursor-pointer capitalize text-[1rem]"
            >
              All
            </DropdownMenuItem>
            {brandsData.data.slice(0, 15).map((brand) => (
              <DropdownMenuItem
                onClick={() => updateQuery("brand", brand._id)}
                key={brand._id}
                className="text-main hover:!text-main cursor-pointer capitalize text-[1rem]"
              >
                {brand.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

      </section>
    </>
  );
};

export default Filter;
