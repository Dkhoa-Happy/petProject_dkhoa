import React, { Suspense } from "react";
import { PostCardSkeleton } from "@/module/post/components/PostCard";
import UserPost from "@/module/user/components/UserPost";
import UserProfile from "@/module/user/components/UserProfile";

const Page = ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  return (
    <section className="profile_container">
      <UserProfile id={id} />

      <div className="flex-1 flex flex-col gap-5 lg:mt-5">
        <p className="text-30-bold">All Post</p>
        <ul className="card_grid-sm">
          <Suspense fallback={<PostCardSkeleton />}>
            <UserPost id={id} />
          </Suspense>
        </ul>
      </div>
    </section>
  );
};

export default Page;
