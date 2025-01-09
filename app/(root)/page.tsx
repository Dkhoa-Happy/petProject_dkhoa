"use client";

import React, { useEffect, useState } from "react";
import SearchForm from "@/components/SearchForm";
import PostCard from "@/components/PostCard";
import LoaderSpin from "@/components/LoaderSpin";
import { Post } from "@/module/post/interface";
import { User } from "@/module/user/interface";
import { getAllPost } from "@/module/post/postApi";
import { getAllUser } from "@/module/user/userApi";

interface SearchParams {
  query?: string;
}

const Home = ({ searchParams }: { searchParams: SearchParams }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [page, setPage] = useState(1); // Current page
  const [isLoading, setIsLoading] = useState(false); // Prevent duplicate loads
  const [hasMore, setHasMore] = useState(true); // Tracks if there’s more data to load

  const query = searchParams?.query || "";

  // Fetch users only once
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllUser();
        setUsers(usersData || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch posts for the current page
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
      <section className="blue_container">
        <h1 className="heading">
          Manage Your Post, <br />
          Connect with People
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit your post and connect with people from around the world.
        </p>
        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for "${query}"` : "All Posts"}
        </p>

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
                />
              );
            })
          ) : (
            <p className="no-results">No Post Found</p>
          )}
        </ul>
      </section>

      {hasMore && (
        <LoaderSpin
          onInView={fetchPosts} // Fetch posts when spinner is in view
          isLoading={isLoading} // Prevent duplicate loading
        />
      )}
    </>
  );
};

export default Home;
