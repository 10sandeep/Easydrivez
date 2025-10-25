import zod from "zod";

export const adminLoginValidator = zod.object({
    email: zod.string().email({ message: "Invalid email address" }),
    password: zod.string().min(6, { message: "Password must be at least 6 characters long" })
});

export const adminLoginCreateValidator = zod.object({
    username: zod.string().min(3, { message: "Username must be at least 3 characters long" }),
    email: zod.string().email({ message: "Invalid email address" }),
    password: zod.string().min(6, { message: "Password must be at least 6 characters long" }),
    img: zod.string().optional(),
    phone: zod.string().optional()
});

