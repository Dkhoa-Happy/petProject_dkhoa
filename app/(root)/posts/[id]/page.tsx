import React from "react";
import PostDetail from "@/module/post/components/PostDetail";

const Page = async ({ params }: { params: Promise<{ id: number }> }) => {
  const id = (await params).id;

  return (
    <>
      <PostDetail id={id} />
    </>
  );
};

export default Page;
