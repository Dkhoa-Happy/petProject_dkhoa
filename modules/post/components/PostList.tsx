"use client";

import React from "react";
import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Post } from "@/modules/post/interface";
import { User } from "@/modules/user/interface";
import { getAllUser } from "@/modules/user/userApi";
import { searchPost, getAllPost } from "@/modules/post/postApi";
import LoaderSpin from "@/components/LoaderSpin";
import PostCard from "@/modules/post/components/PostCard";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { regex } from "@/constants";

const PostList = ({ query }: { query: string }) => {
  const queryClient = useQueryClient();

  // Fetch users
  const { data: users = [], isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: () => getAllUser(1, 100),
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
    queryFn: ({ pageParam = 1 }) =>
      query ? searchPost(query) : getAllPost(pageParam, 10),
    getNextPageParam: (lastPage, allPages) => {
      if (query) return undefined;
      return lastPage?.length > 0 ? allPages.length + 1 : undefined;
    },
  });

  // Map posts and extract imageUrl
  const posts =
    data?.pages.flatMap((page) =>
      page.map((post: Post) => {
        const match = post.body.match(regex);
        return { ...post, imageUrl: match ? match[1] : null };
      }),
    ) || [];

  // Function to handle refreshing the posts
  const refreshPosts = () => {
    queryClient.invalidateQueries(["posts", query]);
  };

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
                onPostChange={refreshPosts} // Pass refresh function to PostCard
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
