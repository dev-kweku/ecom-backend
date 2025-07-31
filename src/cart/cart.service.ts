    import { PrismaClient } from "@prisma/client";

    const prisma = new PrismaClient();

    export const CartService = {
    addToCart: async (userId: string, productId: string, quantity = 1) => {
        const cart = await prisma.cart.upsert({
        where: { userId },
        create: { userId },  
        update: {}
        });

        // Check for existing item
        const existingItem = await prisma.cartItem.findFirst({
        where: {
            cartId: cart.id,
            productId
        }
        });

        if (existingItem) {
        return prisma.cartItem.update({
            where: { id: existingItem.id },
            data: { quantity: existingItem.quantity + quantity },
            include: { product: true }
        });
        }

        return prisma.cartItem.create({
            data: {
            // @ts-ignore 
            userId,
            cartId: cart.id,
            productId,
            quantity
            },
            include: {
            product: true
            }
        });
    }
    };