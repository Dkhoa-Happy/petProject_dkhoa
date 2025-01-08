import React, { useEffect, useState } from "react";
import PostCard from "@/components/PostCard";
import { getPostByUserId } from "@/module/post/postApi";
import { getUserById } from "@/module/user/userApi";
import { Post } from "@/module/post/interface";
import { User } from "@/module/user/interface";

const UserPost = ({ id }: { id: number }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postData, userData] = await Promise.all([
          getPostByUserId(id),
          getUserById(id),
        ]);

        if (postData) return setPosts(postData);
        if (userData) return setUsers(userData);
      } catch (e) {
        console.log("Error fetching data: ", e);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post) => {
          const user = users.find((user) => user.id === post.user_id);
          return <PostCard key={post.id} post={post} user={user} />;
        })
      ) : (
        <p className="no-results">No Post Found</p>
      )}
    </>
  );
};
export default UserPost;
