"use client";

import React from "react";
import Image from "next/image";
import ScrollToTop from "react-scroll-up";

const ScrollToTopButton = () => {
  return (
    <div className="relavtive z-[300]">
      <ScrollToTop showUnder={160}>
        <p className="font-bold cursor-pointer text-3xl hover:border-2 hover:border-blue-700">
          <Image
            src="/icons/scroll-to-top.svg"
            alt="Scroll To Top button"
            width={100}
            height={100}
          />
        </p>
      </ScrollToTop>
    </div>
  );
};
export default ScrollToTopButton;
