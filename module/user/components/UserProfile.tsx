"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/module/user/userApi";
import Image from "next/image";
import { avatarUserPlaceholder } from "@/constants";
import { User } from "@/module/user/interface";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const UserProfile = ({ id }: { id: number }) => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User>(["user", id], () => getUserById(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !user) {
    return <div>Error fetching user data</div>;
  }

  const borderColor =
    user?.status === "active" ? "border-green-500" : "border-red-500";

  return (
    <div className="profile_card">
      <div className="profile_title flex justify-center items-center gap-1">
        <h3 className="text-24-black uppercase text-center line-clamp-1">
          {user.name}
        </h3>
        {user?.email?.includes("@emard") && (
          <>
            {user.gender === "male" ? (
              <Image
                src="/icons/crown-king.svg"
                alt="crown king"
                width={34}
                height={34}
              />
            ) : (
              <Image
                src="/icons/crown-queen.svg"
                alt="crown queen"
                width={34}
                height={34}
              />
            )}
          </>
        )}

        {user?.email?.includes("@luettgen") && (
          <Image
            src="/icons/guard.svg"
            alt="guard badge"
            width={25}
            height={25}
          />
        )}
      </div>
      {user?.email?.includes("@johnston") ? (
        <div className={`rounded-full p-0.5 border-2 ${borderColor}`}>
          <Image
            src={avatarUserPlaceholder}
            alt="avatar"
            width={220}
            height={220}
            className="profile_image"
          />
        </div>
      ) : (
        <Image
          src={avatarUserPlaceholder}
          alt="avatar"
          width={220}
          height={220}
          className="profile_image"
        />
      )}
      <p className="text-30-extrabold mt-7 text-center">{user.email}</p>
      <p className="mt-1 text-center text-14-normal">{user.gender}</p>
    </div>
  );
};

export default UserProfile;
