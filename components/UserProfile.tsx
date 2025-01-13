"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/module/user/userApi";
import Image from "next/image";
import { avatarUserPlaceholder } from "@/constants";
import { User } from "@/module/user/interface";

const UserProfile = ({ id }: { id: number }) => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery<User>(
    ["user", id], // Query key
    () => getUserById(id), // Fetch function
    {
      staleTime: 1000 * 60 * 5, // Giữ dữ liệu trong 5 phút
      retry: 1, // Thử lại 1 lần nếu lỗi
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !user) {
    return <div>Error fetching user data</div>;
  }

  return (
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
      <p className="text-30-extrabold mt-7 text-center">{user.email}</p>
      <p className="mt-1 text-center text-14-normal">{user.gender}</p>
    </div>
  );
};

export default UserProfile;
