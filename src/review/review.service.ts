import { PrismaClient,Prisma } from "@prisma/client";
import z from 'zod'
import { CreateReviewSchema } from "./review.schema";
const prisma = new PrismaClient();



export const ReviewService={
    create:async(productId:string,userId:string,input:z.infer<typeof CreateReviewSchema>)=>{
        const existing=await prisma.review.findMany({
            where:{userId,productId},
        });
        if(existing){
            throw new Error('You have already reviewed this product')
        }
        return prisma.review.create({
            data:{
                ...input,productId,userId,
            }
        })
    },
    

    getForProduct:async(productId:string)=>{
        return prisma.review.findMany({
            where:{productId},
            include:{
                user:{select:{id:true,name:true}},
            },
            orderBy:{createdAt:'desc'}
        })
    }
}