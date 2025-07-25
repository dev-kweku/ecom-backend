import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { PrismaClient,Prisma } from "@prisma/client";
const JWT_SECRET=process.env.JWT_SECRET!;
const prisma=new PrismaClient();

/**
 * protect middlware
 */

export const protect=async(
    req:Request,
    res:Response,
    next:NextFunction
)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader||!authHeader.startsWith('Bearer')){
        return res.status(401).json({message:"Not authernticated"})
    }

    const token=authHeader.split(' ')[1];

    try{
        const payload=jwt.verify(token,JWT_SECRET) as {sub:string};

        const user=await prisma.user.findUnique({
            where:{
                id:payload.sub
            },
            select:{
                id:true,
                email:true,
                role:true,
            }

            
        });
        if(!user){
            return res.status(401).json({message:"User not found"})
        }
        req.user=user;
        next();

        
    
    }catch(err:any){
        return res.status(401).json({message:"Invalid token"})

    }
}

export const restrictTo=(...roles:string[])=>{
    return(req:Request,res:Response,next:NextFunction)=>{
        if(!req.user|| !roles.includes(req.user.role)){
            return res.status(403).json({message:"Forbiden:Insuficient role"});

        }
        next()
    }
}