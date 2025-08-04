import { PrismaClient } from "@prisma/client";
import z from 'zod'
import { CreateReviewSchema } from "./review.schema";

const prisma =new PrismaClient();


export const ReviewService={
    create:async(productId:string,userId:string,input:z.infer<typeof CreateReviewSchema>)=>{
        
    }
}