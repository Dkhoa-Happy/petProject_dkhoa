import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(10, { message: "Title must be at least 3 characters." })
    .max(100, { message: "Title must be at most 100 characters." }),
  body: z
    .string()
    .min(20, { message: "Body must be at least 20 characters." })
    .max(500, { message: "Body must be at most 500 characters." }),
});
