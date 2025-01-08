import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { getAllPost } from "@/module/post/postApi";

const LoaderSpin = () => {
  const [ref, inView] = useInView();
  const [data, setData] = useState();

  useEffect(() => {
    if (inView) {
      const fetchPosts = async () => {
        const data = await getAllPost();
        setData(data || []); // Ensure data is an array
      };

      fetchPosts();
    }
  }, [inView, data]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10"></section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="/icons/LoaderSpin"
            alt="loaderspin"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
};
export default LoaderSpin;
