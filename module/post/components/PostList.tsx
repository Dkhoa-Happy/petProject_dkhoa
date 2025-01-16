"use client";

import React from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { Post } from "@/module/post/interface";
import { User } from "@/module/user/interface";
import { getAllUser } from "@/module/user/userApi";
import { searchPost, getAllPost } from "@/module/post/postApi";
import LoaderSpin from "@/components/LoaderSpin";
import PostCard from "@/module/post/components/PostCard";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { regex } from "@/constants";

const PostList = ({ query }: { query: string }) => {
  const { data: users = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUser(1, 100),
    select: (data) => data?.data || [],
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoadingPosts,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", query],
    queryFn: ({ pageParam = 1 }) =>
      query ? searchPost(query) : getAllPost(pageParam, 10),
    getNextPageParam: (lastPage, allPages) => {
      if (query) return undefined; // Stop infinite fetching when in search mode
      return lastPage?.length > 0 ? allPages.length + 1 : undefined;
    },
  });

  const posts =
    data?.pages.flatMap((page) =>
      page.map((post: Post) => {
        const match = post.body.match(regex);
        return { ...post, imageUrl: match ? match[1] : null };
      }),
    ) || [];

  return (
    <>
      <ul className="mt-7 card_grid">
        {isLoadingUsers || isLoadingPosts ? (
          <PostCardSkeleton />
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
          <p className="no-results">
            {query ? `No results for "${query}"` : "No posts found"}
          </p>
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

export const PostCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4, 5].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="post_skeleton" />
      </li>
    ))}
  </>
);

export default PostList;
