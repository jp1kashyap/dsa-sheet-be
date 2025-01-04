import { z } from "zod";

export const UserRegistrantionValidation = z.object({
  name: z.string().min(3),
  phone: z.string().min(10).max(11),
  email: z.string().email(),
  password: z.string().min(8).max(32),
});

export const UserLoginValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(32),
});
