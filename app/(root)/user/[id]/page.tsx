"use client";

import React, { Suspense, useEffect, useState } from "react";
import { User } from "@/module/user/interface";
import { getUserById } from "@/module/user/userApi";
import Image from "next/image";
import { PostCardSkeleton } from "@/components/PostCard";
import UserPost from "@/components/UserPost";
import { avatarUserPlaceholder } from "@/constants";

const Page = ({ params }: { params: Promise<{ id: number }> }) => {
  const id = params.id;
  const [user, setUser] = useState<User[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserById(id);
      if (data) return setUser(data);
    };
    fetchUser();
  }, [id]);

  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user.name}
            </h3>
          </div>
          <Image
            src={avatarUserPlaceholder}
            alt="avatar"
            width={220}
            height={220}
            className="profile_image"
          />

          <p className="text-30-extrabold mt-7 text-center">{user?.email}</p>
          <p className="mt-1 text-center text-14-normal">{user?.gender}</p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:mt-5">
          <p className="text-30-bold">All Post</p>
          <ul className="card_grid-sm">
            <Suspense fallback={<PostCardSkeleton />}>
              <UserPost id={id} />
            </Suspense>
          </ul>
        </div>
      </section>
    </>
  );
};
export default Page;
