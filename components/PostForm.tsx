"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useQuery, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import api from "@/api/axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { User } from "@/module/user/interface";
import { getAllUser } from "@/module/user/userApi";

const submitPost = async ({
  selectedUser,
  formValues,
}: {
  selectedUser: number;
  formValues: { title: string; body: string };
}) => {
  const response = await api.post(`/users/${selectedUser}/posts`, {
    title: formValues.title,
    body: formValues.body,
  });
  return response.data;
};

const PostForm = () => {
  const [post, setPost] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<number | "">("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const router = useRouter();

  const {
    data: userResponse,
    isLoading: isLoadingUsers,
    error,
  } = useQuery(["users"], () => getAllUser(1, 100), {
    onSuccess: (response) => {
      console.log("Users loaded:", response.data);
      if (response.data.length > 0) {
        setSelectedUser(response.data[0].id);
      }
    },
    onError: (error) => {
      console.error("Error loading users:", error);
    },
  });

  const users = userResponse?.data || [];

  const mutation = useMutation(submitPost, {
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Post created successfully",
      });
      router.push(`/posts/${data.id}`);
    },
    onError: (error: any) => {
      console.error("Error during mutation:", error);
      const message =
        error.response?.data?.message || "An unexpected error occurred.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const formValues = {
      title: formData.get("title") as string,
      body: post,
    };

    try {
      await formSchema.parseAsync(formValues);

      if (!selectedUser) {
        setErrors((prev) => ({
          ...prev,
          user: "Please select a user.",
        }));
        toast({
          title: "Validation Error",
          description: "Please select a valid user",
          variant: "destructive",
        });
        return;
      }

      mutation.mutate({ selectedUser: Number(selectedUser), formValues });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as Record<string, string>);

        toast({
          title: "Validation Error",
          description:
            "Invalid input. Please correct the errors and try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
      console.error("Validation failed:", error);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="user" className="post-form_label">
          User
        </label>
        <Select
          value={selectedUser ? String(selectedUser) : undefined}
          onValueChange={(value) => setSelectedUser(Number(value))}
        >
          <SelectTrigger className="post-form_input">
            <SelectValue>
              {selectedUser
                ? users.find((user: User) => user.id === selectedUser)?.name ||
                  "Select a user"
                : "Select a user"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {isLoadingUsers ? (
              <SelectItem value="loading" disabled>
                Loading users...
              </SelectItem>
            ) : error ? (
              <SelectItem value="error" disabled>
                Failed to load users.
              </SelectItem>
            ) : users.length > 0 ? (
              users.map((user: User) => (
                <SelectItem key={user.id} value={String(user.id)}>
                  {user.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-users" disabled>
                No users available.
              </SelectItem>
            )}
          </SelectContent>
        </Select>

        {errors.user && <p className="post-form_error">{errors.user}</p>}
      </div>

      <div>
        <label htmlFor="title" className="post-form_label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          className="post-form_input"
          required
          placeholder="Post Title"
        />
        {errors.title && <p className="post-form_error">{errors.title}</p>}
      </div>

      <div data-color-mode="light">
        <label htmlFor="post" className="post-form_label">
          Body
        </label>
        <MDEditor
          value={post}
          onChange={(value) => setPost(value as string)}
          id="post"
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
        {errors.body && <p className="post-form_error">{errors.body}</p>}
      </div>

      <Button
        type="submit"
        disabled={mutation.isLoading}
        className="post-form_btn text-white"
      >
        {mutation.isLoading ? "Submitting..." : "Submit Your Post"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default PostForm;
