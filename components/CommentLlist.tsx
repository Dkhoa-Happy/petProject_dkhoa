import React from "react";
import { Comment } from "@/module/comment/interface";
import { useQuery } from "@tanstack/react-query";
import { getCommentByPostId } from "@/module/comment/commentApi";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { avatarUserPlaceholder } from "@/constants";

const CommentList = ({ post_id }: { post_id: number }) => {
  const {
    data: comments = [],
    isLoading,
    isError,
    error,
  } = useQuery<Comment[]>(
    ["comments", post_id],
    () => getCommentByPostId(post_id),
    {
      staleTime: 1000 * 60 * 5,
      retry: 1,
      onError: (error) => {
        console.error("Error fetching comments:", error);
      },
    },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <div>
        <p>Error fetching comments:</p>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </div>
    );
  }

  if (comments.length === 0) {
    return <div>No comments found for this post.</div>;
  }

  return (
    <>
      <h2 className="text-30-bold">Comments</h2>
      {comments.map((item) => (
        <Card key={item.id} className="post mb-3">
          <CardHeader>
            <Avatar>
              <AvatarImage src={avatarUserPlaceholder} alt="User Avatar" />
            </Avatar>
            <CardTitle className="text-20-medium">{item.name}</CardTitle>
            <CardDescription className="text-16-medium !text-black-300">
              {item.email}
            </CardDescription>
          </CardHeader>
          <div className="p-4">{item.body}</div>
        </Card>
      ))}
    </>
  );
};

export default CommentList;
