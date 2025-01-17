"use client";

import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface LoaderSpinProps {
  onInView: () => void;
  isLoading: boolean;
}

const LoaderSpin = ({ onInView, isLoading }: LoaderSpinProps) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    if (inView && !isLoading) {
      onInView();
    }
  }, [inView, isLoading, onInView]);

  return (
    <div ref={ref} className="flex justify-center items-center w-full my-4">
      <img
        src="/icons/Loader.svg"
        alt="Loading spinner"
        width={56}
        height={56}
        className="object-contain animate-spin"
      />
    </div>
  );
};

export default LoaderSpin;
