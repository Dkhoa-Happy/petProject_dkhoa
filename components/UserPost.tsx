"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import PostCard from "@/components/PostCard";
import { getPostByUserId } from "@/module/post/postApi";
import { getUserById } from "@/module/user/userApi";
import { Post } from "@/module/post/interface";
import { User } from "@/module/user/interface";

const UserPost = ({ id }: { id: number }) => {
  // Query để lấy danh sách bài viết
  const {
    data: posts = [],
    isLoading: isLoadingPosts,
    isError: isErrorPosts,
  } = useQuery<Post[]>(
    ["posts", id], // Key của query
    () => getPostByUserId(id), // Hàm fetch dữ liệu
    {
      staleTime: 1000 * 60 * 5, // Dữ liệu sẽ được lưu cache trong 5 phút
      retry: 1, // Thử lại 1 lần nếu lỗi
    },
  );

  // Query để lấy thông tin người dùng
  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useQuery<User>(
    ["user", id], // Key của query
    () => getUserById(id), // Hàm fetch dữ liệu
    {
      staleTime: 1000 * 60 * 5, // Dữ liệu sẽ được lưu cache trong 5 phút
      retry: 1, // Thử lại 1 lần nếu lỗi
    },
  );

  // Xử lý lỗi
  if (isErrorPosts || isErrorUser) {
    return <p className="error">Error fetching data.</p>;
  }

  // Xử lý trạng thái loading
  if (isLoadingPosts || isLoadingUser) {
    return <p className="loading">Loading...</p>;
  }

  // Xử lý bài viết có chứa hình ảnh
  const updatedPosts = posts.map((post) => {
    const regex = /!\[.*?\]\((.*?)\)/;
    const match = post.body.match(regex);
    return { ...post, imageUrl: match ? match[1] : null };
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
            index={index + 1} // Truyền index vào PostCard
          />
        ))
      ) : (
        <p className="no-results">No Post Found</p>
      )}
    </>
  );
};

export default UserPost;
