import {z} from 'zod'

export const CreateProductSchema = z.object({
    name: z.string().min(2),
    slug: z.string().min(2),
    description: z.string().min(10), // ✅ must match Prisma model
    price: z.number().positive(),
    categoryId: z.string().uuid(),
    image: z.string().optional(),
});


export const updateProductSchema=CreateProductSchema.partial();

export type CreateProductInput=z.infer<typeof CreateProductSchema>
export type UpdateProductInput=z.infer<typeof updateProductSchema>

