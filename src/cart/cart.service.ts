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
            userId,
            cartId: cart.id,
            productId,
            quantity
            },
            include: {
            product: true
            }
        });
    },

    getCart:async(userId:string)=>{
        return prisma.cartItem.findMany(
            {
                where:{userId},
                include:{product:true}
            })
    },
    updateQuantity:async(id:string,quantity:number)=>{
        return prisma.cartItem.update({
            where:{id},
            data:{quantity},
        })
    },

    removeFromCart:async(id:string)=>{
        return prisma.cartItem.delete({where:{id}})
    }
    };