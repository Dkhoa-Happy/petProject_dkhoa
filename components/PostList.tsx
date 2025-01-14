"use client";

import React from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { Post } from "@/module/post/interface";
import { User } from "@/module/user/interface";
import { getAllUser } from "@/module/user/userApi";
import LoaderSpin from "@/components/LoaderSpin";
import PostCard from "@/components/PostCard";
import { getAllPost } from "@/module/post/postApi";

const PostList = ({ query }: { query: string }) => {
  // Fetch all users
  const { data: users = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUser,
    select: (data) => data?.data || [],
  });

  // Fetch posts with infinite scrolling
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoadingPosts,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", query],
    queryFn: ({ pageParam = 1 }) => getAllPost(pageParam, 10),
    getNextPageParam: (lastPage, allPages) => {
      // Check if there are more posts to load
      return lastPage?.length > 0 ? allPages.length + 1 : undefined;
    },
  });

  const posts =
    data?.pages.flatMap((page) =>
      page.map((post: Post) => {
        const regex = /!\[.*?\]\((.*?)\)/;
        const match = post.body.match(regex);
        return { ...post, imageUrl: match ? match[1] : null };
      }),
    ) || [];

  return (
    <>
      <ul className="mt-7 card_grid">
        {isLoadingUsers || isLoadingPosts ? (
          <p>Loading...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => {
            const user = users.find((user: User) => user.id === post.user_id);
            return (
              <PostCard
                key={post.id}
                post={post}
                user={user}
                imageUrl={post.imageUrl || ""}
                index={1}
              />
            );
          })
        ) : (
          <p className="no-results">No Post Found</p>
        )}
      </ul>
      {hasNextPage && (
        <LoaderSpin
          onInView={() => fetchNextPage()}
          isLoading={isFetchingNextPage}
        />
      )}
    </>
  );
};

export default PostList;
