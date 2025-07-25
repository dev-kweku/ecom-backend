import {Request,Response} from "express"
import { AuthService } from "./auth.service"
import { SignUpSchema,loginSchema } from "./auth.schema"
import { Sign } from "crypto"

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
}