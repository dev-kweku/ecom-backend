import {z} from "zod";

export const CreateCategorySchema=z.object({
    name:z.string().min(2),
    slug:z.string().min(2),
})

export const UpdateCategorySchema=z.object({
    name:z.string().optional(),
    slug:z.string().optional(),
})