// using schema on zod
import {z} from "zod"

export const registrationSchema=z.object({
    email:z.string().email(),
    name:z.string().min(1),
    password:z.string().min(6)
})

export const loginSchema=z.object({
    email:z.string().email(),
    password:z.string().min(1),
})


export type RegistrationInput=z.infer<typeof registrationSchema>;
export type LoginInput=z.infer<typeof loginSchema>;