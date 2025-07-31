import { PrismaClient } from "@prisma/client";
import { CreateCategorySchema,UpdateCategorySchema } from "./cartegory.schema";
import z from "zod";

const prisma=new PrismaClient()
export const CategoryService={
    create:async(input:z.infer<typeof CreateCategorySchema>)=>{
        return prisma.category.create({data:input})
    },

    getAll:async()=>{
        return prisma.category.findMany({orderBy:{createdAt:'desc'}})

    },

    getById:async(id:string)=>{
        return prisma.category.findUnique({where:{id}})
    },


    update:async (id:string,input:z.infer<typeof UpdateCategorySchema>)=>{
        return prisma.category.update({where:{id},data:input})
    },

    delete:async (id:string)=>{
        return prisma.category.delete({where:{id}})
    }
    
}

