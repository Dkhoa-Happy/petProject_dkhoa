"use client";

import React, { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import { getPostByUserId } from "@/module/post/postApi";
import { getUserById } from "@/module/user/userApi";
import { Post } from "@/module/post/interface";
import { User } from "@/module/user/interface";

const UserPost = ({ id }: { id: number }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postData, userData] = await Promise.all([
          getPostByUserId(id),
          getUserById(id),
        ]);

        if (postData && Array.isArray(postData)) {
          const updatedPosts = postData.map((post) => {
            const regex = /!\[.*?\]\((.*?)\)/;
            const match = post.body.match(regex);
            return { ...post, imageUrl: match ? match[1] : null };
          });
          setPosts(updatedPosts);
        }

        if (userData) {
          setUser(userData);
        }
      } catch (e) {
        console.log("Error fetching data: ", e);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            user={user || undefined}
            imageUrl={post.imageUrl || ""}
            index={1}
          />
        ))
      ) : (
        <p className="no-results">No Post Found</p>
      )}
    </>
  );
};

export default UserPost;
