"use client";
import React from "react";
import Pagination from "@mui/material/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { data } from "@/types/product.type";

const Mypagination = ({ data, startTransition }: { data: data; startTransition: React.TransitionStartFunction }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = +(searchParams.get("page") || "1");
  const updateQuery = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value) {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    startTransition(() => {
      router.push(`/products?${params.toString()}`);
    });

  };

  return (
    <>
      <section className="flex justify-center pb-5">
        <Pagination
          count={data?.metadata?.numberOfPages}
          page={currentPage}
          onChange={(event, value) => {
            window.scrollTo({ top: 0, behavior: "smooth" })
            updateQuery("page", `${value}`)
          }}
          sx={{
            "& .MuiPaginationItem-root": {
              color: "black",
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "green",
              color: "white",
              "&:hover": {
                backgroundColor: "darkgreen",
              },
            },
          }}
        />
      </section>
    </>
  );
};

export default Mypagination;
