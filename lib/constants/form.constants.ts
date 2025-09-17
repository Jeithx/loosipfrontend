import { z } from "zod";

export const SIGN_UP_SCHEMA = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
    phone: z.string().min(10, "Phone number is required"),
    userName: z.string().min(2, "User name is required"),
    displayName: z.string().min(2, "Display name is required"),
    birthDate: z.date(),
    genderId: z.number(),
    terms: z
      .boolean()
      .refine((val) => val, { message: "You must accept the terms" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const SIGN_IN_SCHEMA = z.object({
  email: z.string(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const RESET_PASSWORD_SCHEMA = z
  .object({
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const FORGOT_PASSWORD_SCHEMA = z.object({
  email: z.string().email("Invalid email address"),
});

export const VERIFY_CODE_SCHEMA = z.object({
  code: z
    .string()
    .min(6, "Enter the 6-digit code")
    .max(6, "Code must be 6 digits"),
});
