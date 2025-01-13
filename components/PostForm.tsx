"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import MDEditor from "@uiw/react-md-editor";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import api from "@/api/axios";
import { formSchema } from "@/lib/validation";
import { User } from "@/module/user/interface";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const PostForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [post, setPost] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        const usersData = response.data || [];
        setUsers(usersData);
        if (usersData.length > 0) {
          setSelectedUser(usersData[0].id);
        }
      } catch (e) {
        console.error("Failed to fetch users:", e);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsPending(true);
    try {
      const formData = new FormData(event.currentTarget);
      const formValues = {
        title: formData.get("title") as string,
        body: post,
      };

      // Validate form data
      await formSchema.parseAsync(formValues);

      // Make API request
      const response = await api.post(`/users/${selectedUser}/posts`, {
        title: formValues.title,
        body: formValues.body,
      });

      // Success notification and redirect
      toast({
        title: "Success",
        description: "Post created successfully",
      });
      router.push(`/posts/${response.data.id}`);
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="User" className="post-form_label">
          User
        </label>
        <Select
          onValueChange={(value) => setSelectedUser(value)}
          defaultValue={users.length > 0 ? users[0].id : undefined}
        >
          <SelectTrigger className="post-form_input">
            <SelectValue placeholder="Select a user" />
          </SelectTrigger>
          <SelectContent>
            {users.length > 0 ? (
              users.map((user) => (
                <SelectItem key={user.id} value={user.id}>
                  {user.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem value="no-users" disabled>
                No users available
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        {!selectedUser && (
          <p className="post-form_error">Please select a valid user</p>
        )}
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
        disabled={isPending}
        className="post-form_btn text-white"
      >
        {isPending ? "Submitting..." : "Submit Your Post"}
        <Send className="size-6 ml-2" />
      </Button>
    </form>
  );
};

export default PostForm;
