import {Request,Response} from "express"
import { AuthService } from "./auth.service"
import { SignUpSchema,loginSchema } from "./auth.schema"
import { Sign } from "crypto"
import jwt from 'jsonwebtoken'
import { Prisma,PrismaClient } from "@prisma/client"

const prisma=new PrismaClient()
const JWT_SECRET=process.env.JWT_SECRET!;
const JWT_EXPIRES_IN='7d';

export class AuthController{
    static async signup(req:Request,res:Response){
        try{
            const data=SignUpSchema.parse(req.body);
            const result=await AuthService.signup(data)
            res.status(201).json(result)
        }catch(error:any){
            if(error.name==='ZodError'){
                return res.status(400).json({message:error.errors})
            }
            res.status(400).json({message:error.message})
        }
    }

    static async login(req:Request,res:Response){
        try{
            const data= loginSchema.parse(req.body)
            const result=await AuthService.login(data)
            res.status(200).json(result);

        }catch(err:any){
            if(err.name==="ZodError"){
                return res.status(400).json({message:err.errors})
            }
            res.status(400).json({message:err.message})
        }
    }

    static async me(req:Request,res:Response){
        try{
            const user=req.user;
            if(!user){
                return res.status(401).json({message:"Unauthorised"});
            }

            return res.status(200).json({
                id:user.id,
                email:user.email,
                role:user.role,
            })
        }catch(error:any){
            return res.status(500).json({message:'Something went wrong'})
        }
    }

    static async refreshToken(req: Request, res: Response) {
        try {
        const token = req.body.refreshToken;
    
        if (!token) {
            return res.status(401).json({ message: 'No refresh token provided' });
        }
    
        const decoded = jwt.verify(token, JWT_SECRET) as { sub: string };
    
        const user = await prisma.user.findUnique({
            where: { id: decoded.sub },
        });
    
        if (!user || user.refreshToken !== token) {
            return res.status(401).json({ message: 'Invalid or expired refresh token' });
        }
    
        const newTokens = AuthService.generateToken(user.id);
    
          // Rotate refresh token in DB
        await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: newTokens.refreshToken },
        });
    
        return res.status(200).json({
            accessToken: newTokens.accessToken,
            refreshToken: newTokens.refreshToken,
        });
        } catch (err) {
        return res.status(401).json({ message: 'Refresh token failed', error: err });
        }
    }
    

}



