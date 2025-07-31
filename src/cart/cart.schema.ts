import {z} from "zod"

export const AddToCartSchema=z.object({
    productId:z.string().uuid(),
    quantity:z.number().min(1).optional(),
});

export const UpdateCartItemSchema=z.object({
    quantity:z.number().min(1),
})

