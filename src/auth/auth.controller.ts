import {Request,Response} from "express"
import { AuthService } from "./auth.service"
import { SignUpSchema,loginSchema } from "./auth.schema"
import { Sign } from "crypto"
import { email } from "zod";

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
}