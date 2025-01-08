"use client";

import React, { useEffect, useState } from "react";
import SearchForm from "@/components/SearchForm";
import PostCard from "@/components/PostCard";
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
  const query = searchParams?.query || "";

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch posts and users in parallel
        const [postsData, usersData] = await Promise.all([
          getAllPost(),
          getAllUser(),
        ]);

        if (postsData) setPosts(postsData);
        if (usersData) setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

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
              return <PostCard key={post.id} post={post} user={user} />;
            })
          ) : (
            <p className="no-results">No Post Found</p>
          )}
        </ul>
      </section>
    </>
  );
};

export default Home;
