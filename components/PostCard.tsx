import React from "react";
import { Post } from "@/module/post/interface";
import { EyeIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/module/user/interface";

const PostCard = ({ post, user }: { post: Post; user?: User }) => {
  const borderColor =
    user?.status === "active" ? "border-green-500" : "border-red-500";

  return (
    <li className="post group">
      <div className="flex-between">
        <p className="post_date">25/1/2025</p>
        <div className="flex gap-1.5">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">10</span>
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
                src="https://i.pinimg.com/736x/e9/e0/7d/e9e07de22e3ef161bf92d1bcf241e4d0.jpg"
                alt={user?.name || "default user"}
                width={48}
                height={48}
                className="rounded-full"
              />
            </div>
          ) : (
            <Image
              src="https://i.pinimg.com/736x/e9/e0/7d/e9e07de22e3ef161bf92d1bcf241e4d0.jpg"
              alt="username"
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
        </Link>
      </div>

      <Link href={`/posts/${post.id}`}>
        <p className="post_desc">{post.body}</p>
        <img
          src="https://i.pinimg.com/736x/ea/2c/f6/ea2cf6975ca4178d53a27b72c301f7b2.jpg"
          alt="post-card_img"
        />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <p className="text-16-medium">Post</p>
        <Button className="post_btn" asChild>
          <Link href={`/posts/${post.id}`}>Detail</Link>
        </Button>
      </div>
    </li>
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
