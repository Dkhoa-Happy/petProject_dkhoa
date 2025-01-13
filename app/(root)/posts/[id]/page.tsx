"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import { getPostById } from "@/module/post/postApi";
import { Post } from "@/module/post/interface";
import { User } from "@/module/user/interface";
import { getUserById } from "@/module/user/userApi";

const md = markdownit();

const Page = ({ params }: { params: { id: number } }) => {
  const id = params.id;
  const [post, setPost] = useState<Post | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await getPostById(id);
        if (postData) {
          setPost(postData);

          // Extract image URL from the post body
          const regex = /!\[.*?\]\((.*?)\)/;
          const match = postData.body.match(regex);
          setImageUrl(match ? match[1] : null);

          // Fetch user details
          const userData = await getUserById(postData.user_id); // Lấy `user_id` từ postData
          if (userData) {
            setUser(userData);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const parsedContent = md.render(post?.body || "");

  return (
    <>
      <section className="blue_container !min-h-[230px]">
        <p className="tag">29/01/2024</p>
        <p className="heading">{post?.title}</p>
      </section>

      <section className="section_container">
        {/* Render the dynamic image URL if it exists; otherwise, fallback to the default thumbnail */}
        <img
          src={
            imageUrl ||
            "https://i.pinimg.com/736x/7e/6a/7a/7e6a7ad6ede2b31f94dc38a6fcd7752e.jpg"
          }
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${user?.id}`}>
              <div className="flex items-center gap-4">
                <Image
                  src="https://i.pinimg.com/736x/e9/e0/7d/e9e07de22e3ef161bf92d1bcf241e4d0.jpg"
                  alt="avatar"
                  width={64}
                  height={64}
                  className="rounded-full drop-shadow-lg"
                />
                <div>
                  <p className="text-20-medium">{user?.name}</p>
                  <p className="text-16-medium !text-black-300">
                    {user?.email}
                  </p>
                </div>
              </div>
            </Link>
            <p className="category-tag">Tech</p>
          </div>

          <h3 className="text-30-bold">Post Detail</h3>
          {parsedContent ? (
            <article
              className="prose max-w-4xl font-work-sans break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className="no-result"> No details provided</p>
          )}
        </div>
      </section>
    </>
  );
};

export default Page;
