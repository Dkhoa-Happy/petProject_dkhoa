"use client";

import React, { useEffect, useState } from "react";
import { Post } from "@/module/post/interface";
import { User } from "@/module/user/interface";
import { getAllUser } from "@/module/user/userApi";
import LoaderSpin from "@/components/LoaderSpin";
import PostCard from "@/components/PostCard";
import { getAllPost } from "@/module/post/postApi";

const PostList = ({ query }: { query: string }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await getAllUser();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const fetchPosts = async () => {
    if (isLoading || !hasMore) return; // Skip if already loading or no more posts
    setIsLoading(true);
    try {
      const postsData = await getAllPost(page, 10); // Fetch 10 posts per page
      if (postsData?.length > 0) {
        const updatedPost = postsData.map((post: Post) => {
          const regex = /!\[.*?\]\((.*?)\)/;
          const match = post.body.match(regex);
          return { ...post, imageUrl: match ? match[1] : null };
        });

        setPosts((prevPosts) => [...prevPosts, ...updatedPost]);
        setPage((prevPage) => prevPage + 1); // Increment page
      } else {
        setHasMore(false); // No more posts to load
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {" "}
      <ul className="mt-7 card_grid">
        {posts.length > 0 ? (
          posts.map((post) => {
            const user = users.find((user) => user.id === post.user_id);
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
      {hasMore && <LoaderSpin onInView={fetchPosts} isLoading={isLoading} />}
    </>
  );
};
export default PostList;
