"use client";

import React, { useEffect, useState } from "react";
import { User } from "@/module/user/interface";
import Image from "next/image";
import { avatarUserPlaceholder } from "@/constants";
import { getUserById } from "@/module/user/userApi";

const UserProfile = ({ id }: { id: number }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(id);
        if (data) {
          setUser(data);
        } else {
          console.error("User not found");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
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
