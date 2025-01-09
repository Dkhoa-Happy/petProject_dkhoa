import { z } from "zod";

export const formSchema = {
  title: z.string().min(3).max(100),
  body: z.string().min(20).max(500),
};
