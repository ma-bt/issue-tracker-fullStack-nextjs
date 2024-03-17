import { z } from "zod";

export const createIssueSchema = z.object({
  title: z.string().min(1, "Title is required").max(255),
  description: z.string().min(1, "Description is required"),
});



export const loginSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(5, { message: "Password is too short" })
    .max(20, { message: "Password is too long" }),
});