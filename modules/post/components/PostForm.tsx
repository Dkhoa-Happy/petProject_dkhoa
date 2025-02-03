"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Input } from "@/components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useMutation, useInfiniteQuery } from "@tanstack/react-query";
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
import { User } from "@/modules/user/interface";
import { getAllUser } from "@/modules/user/userApi";

// Số lượng người dùng lấy mỗi lần request
const limit = 10;

// Hàm submit post
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

interface Props {
  type: "create" | "update";
  schema: z.ZodObject<{ title: z.ZodString; body: z.ZodString }>;
}

const PostForm = ({ type, schema }: Props) => {
  const [post, setPost] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<number | "">("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const router = useRouter();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  /**
   * Nếu API hỗ trợ filter theo tên, bạn có thể sửa lại hàm getAllUser và truyền searchQuery ở đây.
   * Trong ví dụ này, chúng ta vẫn lấy tất cả rồi lọc phía client.
   */
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isLoadingUsers,
    refetch,
  } = useInfiniteQuery({
    queryKey: ["users", searchQuery],
    queryFn: ({ pageParam = 1 }) => getAllUser(pageParam, limit),
    getNextPageParam: (lastPage, allPages) =>
      lastPage?.data.length > 0 && allPages.length * limit < lastPage.total
        ? allPages.length + 1
        : undefined,
  });

  const allUsers = useMemo(
    () => data?.pages?.flatMap((page) => page.data as User[]) ?? [],
    [data],
  );
  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [allUsers, searchQuery]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 },
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

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

  // Sử dụng useCallback để tránh tạo hàm mới mỗi lần render
  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
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
    },
    [post, selectedUser, mutation, toast],
  );

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="user" className="post-form_label">
          User
        </label>
        <Select
          value={selectedUser !== "" ? String(selectedUser) : undefined}
          onValueChange={(value) => setSelectedUser(Number(value))}
        >
          <SelectTrigger className="post-form_input">
            <SelectValue>
              {selectedUser !== ""
                ? allUsers.find((user: User) => user.id === selectedUser)?.name
                : "Select a user"}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <div className="p-2">
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            {filteredUsers.length === 0 && !isLoadingUsers ? (
              <SelectItem value="no-users" disabled>
                No users found.
              </SelectItem>
            ) : (
              filteredUsers.map((user: User) => (
                <SelectItem key={user.id} value={String(user.id)}>
                  {user.name}
                </SelectItem>
              ))
            )}
            <div ref={loadMoreRef} style={{ height: "1px" }} />
            {isFetchingNextPage && (
              <div className="p-2 text-center">Loading more users...</div>
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
