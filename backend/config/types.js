const z = require("zod");

const userRegisterSchema = z.object({
  username: z
    .string()
    .email()
    .trim()
    .toLowerCase()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(50, { message: "Username cannot exceed 50 characters" })
    .refine((val) => val.length > 0, { message: "Username is required" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .refine((val) => val.length > 0, { message: "Password is required" }),

  firstName: z
    .string()
    .trim()
    .min(2, { message: "First name must be at least 2 characters long" })
    .refine((val) => val.length > 0, { message: "First name is required" }),

  lastName: z
    .string()
    .trim()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .refine((val) => val.length > 0, { message: "Last name is required" }),
});

const userLoginSchema = z.object({
  username: z
    .string()
    .email()
    .trim()
    .toLowerCase()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(50, { message: "Username cannot exceed 50 characters" })
    .refine((val) => val.length > 0, { message: "Username is required" }),

  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .refine((val) => val.length > 0, { message: "Password is required" }),
});

const userUpdateSchema = z.object({
  password: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

const userId = z.object({
  id: z.string(),
});

module.exports = {
  userRegisterSchema,
  userLoginSchema,
  userId,
  userUpdateSchema,
};
