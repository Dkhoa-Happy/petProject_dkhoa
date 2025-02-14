import React from "react";
import PostForm from "@/modules/post/components/PostForm";

const Page = () => {
  return (
    <>
      <section className="blue_container !min-h-[230px]">
        <p className="heading">Update Your Post</p>
      </section>
      <PostForm type="update" />
    </>
  );
};
export default Page;
