"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import markdownit from "markdown-it";
import Link from "next/link";
import Image from "next/image";
import { getPostById } from "@/module/post/postApi";
import { getUserById } from "@/module/user/userApi";
import {
  avatarUserPlaceholder,
  postImagePlaceholder,
  regex,
} from "@/constants";
import CommentList from "@/components/CommentLlist";

const md = markdownit();

const fetchPostWithUser = async (id: number) => {
  const post = await getPostById(id);
  if (!post) throw new Error("Post not found");

  const user = await getUserById(post.user_id);
  return { post, user };
};

const PostDetail = ({ id }: { id: number }) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["postDetail", id],
    queryFn: () => fetchPostWithUser(id),
  });

  if (isLoading) {
    return <p className="loading">Loading post details...</p>;
  }

  if (isError) {
    return (
      <p className="error">
        Error loading post: {(error as Error).message || "Unknown error"}
      </p>
    );
  }

  const { post, user } = data!;
  const imageUrl = post.body.match(regex)?.[1] || null;
  const parsedContent = md.render(post.body || "");

  const borderColor =
    user?.status === "active" ? "border-green-500" : "border-red-500";

  return (
    <>
      <section className="blue_container !min-h-[230px]">
        <p className="tag">29/01/2025</p>
        <p className="heading">{post.title}</p>
      </section>
      <section className="section_container">
        <img
          src={imageUrl || postImagePlaceholder}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />

        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${user?.id}`}>
              <div className="flex items-center gap-4">
                {user?.email?.includes("@johnston") ? (
                  <div className={`rounded-full p-0.5 border-2 ${borderColor}`}>
                    <Image
                      src={avatarUserPlaceholder}
                      alt="avatar"
                      width={64}
                      height={64}
                      className="rounded-full drop-shadow-lg"
                    />
                  </div>
                ) : (
                  <Image
                    src={avatarUserPlaceholder}
                    alt="avatar"
                    width={64}
                    height={64}
                    className="rounded-full drop-shadow-lg"
                  />
                )}
                <div>
                  <div className="text-20-medium flex  gap-1">
                    <p className="text-20-medium">{user?.name}</p>

                    {user?.email?.includes("@emard") && (
                      <>
                        {user.gender === "male" ? (
                          <Image
                            src="/icons/crown-king.svg"
                            alt="crown king"
                            width={34}
                            height={37}
                          />
                        ) : (
                          <Image
                            src="/icons/crown-queen.svg"
                            alt="crown queen"
                            width={34}
                            height={34}
                          />
                        )}
                      </>
                    )}

                    {user?.email?.includes("@luettgen") && (
                      <Image
                        src="/icons/guard.svg"
                        alt="guard badge"
                        width={25}
                        height={35}
                      />
                    )}
                  </div>
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

        <hr className="divider" />

        <CommentList post_id={post.id} />
      </section>
    </>
  );
};

export default PostDetail;
