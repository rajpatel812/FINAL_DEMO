// import { z } from 'zod'

// export const RegisterSchema = z.object({
//     email: z.string().email({ message: "Invalid email address" }),
//     name: z.string(),
//     password: z.string().min(6, { message: "Password must be 6 characters long" }),
//     password2: z.string(),
// }).refine(data => data.password === data.password2, {
//     message: "Passwords do not match",
//     path: ["password2"],
// })