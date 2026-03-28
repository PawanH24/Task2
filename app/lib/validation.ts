import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters"),
  body: z
    .string()
    .min(1, "Body is required")
    .min(5, "Body must be at least 5 characters"),
});
