import { PrismaClient } from "@prisma/client";

const prisma=new PrismaClient()

export const OrderService={
    createOrder:async(userId:string)=>{
        const cartItems=await prisma.cartItem.findMany({
            where:{userId},
            include:{product:true},
        })

        if(!cartItems.length) throw new Error("cart is empty")

            const total=cartItems.reduce((sum,item)=>{
                return sum +item.product.price*item.quantity;
            },0);

            const order=await prisma.order.create({
                data:{
                    userId,
                    total,
                    items:{
                        // create cart
                        create:cartItems.map((item)=>({
                            productId:item.productId,
                            quantity:item.quantity,
                            price:item.product.price,
                        }))
                    },
                    
                },
                include:{items:true},
            });

            await prisma.cartItem.deleteMany({where:{userId}});
            return order;

    },
    getUserOrder:(userId:string)=>prisma.order.findMany({
        where:{userId},
        include:{items:{include:{product:true}}},
        orderBy:{createdAt:'desc'},
    }),

    getOrderById:(id:string,userId:string)=>prisma.order.findFirst({
        where:{id,userId},
        include:{items:{include:{product:true}}}
    })
}


