import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Post } from "@/module/post/interface";
import MDEditor from "@uiw/react-md-editor";
import { z } from "zod";

interface ActionsModalContentProps {
  post: Post;
  onSubmit: (data) => Promise<void>;
  isLoading: boolean;
}

const postUpdateForm = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(500, "Title must be at most 500 characters"),
  body: z
    .string()
    .min(100, "Body must be at least 100 characters")
    .max(500, "Body must be at most 500 characters"),
});

type formSchema = z.infer<typeof postUpdateForm>;

const ActionsModalContent: React.FC<ActionsModalContentProps> = ({
  post,
  onSubmit,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<formSchema>({
    resolver: zodResolver(postUpdateForm),
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
        <Controller
          name="body"
          control={control}
          render={({ field }) => (
            <MDEditor
              {...field}
              preview="edit"
              height={300}
              style={{ borderRadius: 20, overflow: "hidden" }}
              textareaProps={{
                placeholder:
                  "Briefly describe your idea and what problem it solves",
              }}
              previewOptions={{
                disallowedElements: ["style"],
              }}
            />
          )}
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
