import { Request,Response,NextFunction } from "express";
import jwt from "jsonwebtoken";
import {PrismaClient} from "@prisma/client"

const JWT_SECRET=process.env.JWT_SECRET;
const prisma=new PrismaClient()

// export interface AuthenticatedRequest extends Request{
//     user?:{
//         id:string;
//         role:"USER|ADMIN";
//         email:string;
//     };
// }

type AuthUser={
    id:string;
    role:"USER"|"ADMIN";
    email:string;
};

export interface AuthenticatedRequest extends Request{
    user?:AuthUser;
}


export const isAuthenticated=async(
    req:AuthenticatedRequest,
    res:Response,
    next:NextFunction
)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader||!authHeader.startsWith('Bearer ')){
        return res.status(401).json({message:'Unauthorized'})
    }

    const token=authHeader.split(' ')[1]

    try{
        const decoded=jwt.verify(token,JWT_SECRET as string) as{
            userId:string;
        };

        const user=await prisma.user.findUnique({
            where:{id:decoded.userId},
        });

        if(!user){
            return res.status(401).json({message:"User not found"})
        }

        req.user={
            id:user.id,
            role:user.role,
            email:user.email,
        }

        next();
            
    }catch(err){
        console.error(err)
        return res.status(401).json({message:'Ivalid token'})

    }
}