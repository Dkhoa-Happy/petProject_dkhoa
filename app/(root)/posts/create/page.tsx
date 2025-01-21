"use client";

import React from "react";
import PostForm from "@/modules/post/components/PostForm";
import { formSchema } from "@/lib/validation";

const Page = () => {
  return (
    <>
      <section className="blue_container !min-h-[230px]">
        <p className="heading">Submit Your Post</p>
      </section>
      <PostForm type="create" schema={formSchema} />
    </>
  );
};
export default Page;
