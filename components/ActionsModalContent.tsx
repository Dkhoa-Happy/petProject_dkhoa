import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Post } from "@/module/post/interface";
import {
  postUpdateFormSchema,
  PostUpdateFormSchema,
} from "@/module/post/validation/validation";

interface ActionsModalContentProps {
  post: Post;
  onSubmit: (data: Post) => Promise<void>;
  isLoading: boolean;
}

const ActionsModalContent: React.FC<ActionsModalContentProps> = ({
  post,
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostUpdateFormSchema>({
    resolver: zodResolver(postUpdateFormSchema),
    defaultValues: {
      title: post.title,
      body: post.body,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium">
          Title
        </label>
        <Input id="title" {...register("title")} />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="body" className="block text-sm font-medium">
          Body
        </label>
        <Textarea
          id="body"
          rows={6}
          {...register("body")}
          placeholder="Briefly describe your idea and what problem it solves"
          className="resize-none"
        />
        {errors.body && (
          <p className="text-sm text-red-600">{errors.body.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Updating..." : "Update Post"}
      </Button>
    </form>
  );
};

export default ActionsModalContent;
