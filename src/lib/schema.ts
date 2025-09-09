import { required } from "zod/mini";
import { z } from "zod/v4"

export const schemaSignIn = z.object({
  email:z.string().pipe(z.email({error: 'Invalid email address'})) ,
  password: z.string('Password is required').min(6, "Password must be at least 6 characters long"),
});

export const schemaCategory = z.object({
    name: z.string({error: 'Name is required'}).min(4, {message: "Name must be at least 4 characters long"})
})


