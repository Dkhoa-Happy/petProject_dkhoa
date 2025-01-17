import React from "react";
import PostForm from "@/modules/post/components/PostForm";

const Page = () => {
  return (
    <>
      <section className="blue_container !min-h-[230px]">
        <p className="heading">Submit Your Post</p>
      </section>
      <PostForm />
    </>
  );
};
export default Page;
