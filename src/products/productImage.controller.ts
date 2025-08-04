import { Request,Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma=new PrismaClient()

export const ProductImageController={
    upload:async(req:Request,res:Response)=>{
        const productId=req.params.productId;
        const file=req.file as Express.Multer.File;

        if(!file?.path){
            return res.status(400).json({message:'Image upload failed'});
        }

        const image=await prisma.productImage.create({
            data:{
                url:file.path,
                productId,
            }
        });
        res.status(201).json(image)
    }
}


