"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import PostCard from "@/module/post/components/PostCard";
import { getPostByUserId } from "@/module/post/postApi";
import { getUserById } from "@/module/user/userApi";
import { Post } from "@/module/post/interface";
import { User } from "@/module/user/interface";
import { regex } from "@/constants";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const UserPost = ({ id }: { id: number }) => {
  const {
    data: posts = [],
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useQuery<Post[]>(["posts", id], () => getPostByUserId(id));

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useQuery<User>(["user", id], () => getUserById(id));

  if (isErrorPosts || isErrorUser) {
    return <p className="error">Error fetching data.</p>;
  }

  if (isLoadingPosts || isLoadingUser) {
    return <UserSkeleton />;
  }

  const updatedPosts = posts.map((post) => {
    const match = post.body.match(regex);
    return { ...post, imageUrl: match ? match[1] : undefined };
  });

  return (
    <>
      {updatedPosts.length > 0 ? (
        updatedPosts.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
            user={user || undefined}
            imageUrl={post.imageUrl || ""}
            index={index + 1}
          />
        ))
      ) : (
        <p className="no-results">No Post Found</p>
      )}
    </>
  );
};

export const UserSkeleton = () => (
  <>
    {[0, 1, 2, 3].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="post_skeleton" />
      </li>
    ))}
  </>
);

export default UserPost;
