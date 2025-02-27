import { z } from "zod";

export const submissionSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  message: z.string().min(2).max(1000),
  phone: z.string(),
  branch: z.string(),
  date: z.date(),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is required"),
  branch: z.string().min(1, "Please select a branch"),
  sessionDate: z.string().optional(),
  message: z.string().optional(),
  _gotcha: z.string().optional(),
});

export type ContactFormType = z.infer<typeof contactFormSchema>;