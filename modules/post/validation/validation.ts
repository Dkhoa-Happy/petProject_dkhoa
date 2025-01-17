import { z } from "zod";

export const postUpdateFormSchema = z.object({
  title: z
    .string()
    .min(10, "Title must be at least 10 characters")
    .max(500, "Title must be at most 500 characters"),
  body: z
    .string()
    .min(100, "Body must be at least 100 characters")
    .max(500, "Body must be at most 500 characters"),
});

export type PostUpdateFormSchema = z.infer<typeof postUpdateFormSchema>;
