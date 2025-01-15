"use client";

import React from "react";
import PostDetail from "@/components/PostDetail";

const Page = ({ params }: { params: { id: number } }) => {
  const id = params.id;

  return (
    <>
      <PostDetail id={id} />
    </>
  );
};

export default Page;
