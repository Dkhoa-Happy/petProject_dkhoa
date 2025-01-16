import React from "react";
import { cn } from "@/lib/utils";
import markdownit from "markdown-it";
import { motion } from "framer-motion";
import { Post } from "@/module/post/interface";
import { User } from "@/module/user/interface";
import ActionDropdown from "@/components/ActionDropdown";
import Link from "next/link";
import Image from "next/image";
import { avatarUserPlaceholder, postImagePlaceholder } from "@/constants";
import { BookCopy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const md = markdownit();
const PostCard = ({
  post,
  user,
  imageUrl,
  index,
}: {
  post: Post;
  user?: User;
  imageUrl: string;
  index: number;
}) => {
  const borderColor =
    user?.status === "active" ? "border-green-500" : "border-red-500";

  const parsedContent = md.render(post?.body || "");

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{ delay: index * 0.2, ease: "easeInOut", duration: 0.5 }}
      viewport={{ once: true, amount: 0.2 }}
      className="post group"
    >
      <div className="flex-between">
        <p className="post_date">29/01/2025</p>
        <div className="flex gap-1.5">
          <ActionDropdown post={post} />
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1 justify-center">
          <Link href={`/user/${user?.id}`} className="flex items-center gap-2">
            <p className="text-16-medium line-clamp-1">{user?.name}</p>

            {user?.email?.includes("@emard") && (
              <>
                {user.gender === "male" ? (
                  <Image
                    src="/icons/crown-king.svg"
                    alt="crown king"
                    width={34}
                    height={34}
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
                height={25}
              />
            )}
          </Link>

          <Link href={`/posts/${post.id}`}>
            <h3 className="text-26-semibold line-clamp-1">{post.title}</h3>
          </Link>
        </div>

        <Link href={`/user/${user?.id}`}>
          {user?.email?.includes("@johnston") ? (
            <div className={`rounded-full p-0.5 border-2 ${borderColor}`}>
              <Image
                src={avatarUserPlaceholder}
                alt={user?.name || "default user"}
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
          ) : (
            <Image
              src={avatarUserPlaceholder}
              alt="username"
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
        </Link>
      </div>

      <Link href={`/posts/${post.id}`}>
        {parsedContent && (
          <article
            className="post_desc"
            dangerouslySetInnerHTML={{ __html: parsedContent }}
          />
        )}
        <p className="post_desc">{}</p>
        <img
          src={imageUrl || postImagePlaceholder}
          alt="post_img"
          className="post_img"
        />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <p className="text-16-medium">
          <BookCopy />
        </p>
        <Button className="post_btn" asChild>
          <Link href={`/posts/${post.id}`}>Detail</Link>
        </Button>
      </div>
    </motion.div>
  );
};

export const PostCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4].map((index: number) => (
      <li key={cn("skeleton", index)}>
        <Skeleton className="post_skeleton" />
      </li>
    ))}
  </>
);

export default PostCard;
