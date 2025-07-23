// auth service
import {PrismaClient} from "@prisma/client"
import { hashPassword,comparePassword } from "@common/utils/hash"
import { signAccessToken,signRefresgToken } from "@common/utils/jwt"
// import { email } from "zod";


const prisma=new PrismaClient();

export class AuthService{
    static async signup(data:{email:string,password:string,name:string}){
        const userExist=await prisma.user.findUnique({where:{email:data.email}})
        if(userExist) throw new Error("user already exists")

            const hashed=await hashPassword(data.password)

            const user=await prisma.user.create({
                data:{
                    email:data.email,
                    name:data.name,
                    password:hashed
                }

            })

            const accessToken=signAccessToken(user.id);
            const refreshToken=signRefresgToken(user.id)

            await prisma.user.update({
                where:{id:user.id},
                data:{refreshToken},
            });
            return {user,accessToken,refreshToken};
    };

    // login
    static async login(data:{email:string;password:string}){
        const user=await prisma.user.findUnique({where:{email:data.email}})
        if(!user|| !user.password) throw new Error("Invalid credentials")
            const valid=await comparePassword(data.password,user.password);
        if (!valid) throw new Error('Invalid credentials')

            const accessToken=signAccessToken(user.id);
            const refreshToken=signRefresgToken(user.id)

            await prisma.user.update({
                where:{id:user.id},
                data:{refreshToken},
            })

            return {user,accessToken,refreshToken}
    }

    // @getUserProfile
    static async getProfile(userId:string){
        return await prisma.user.findUnique({
            where:{id:userId},
            select:{
                id:true,
                email:true,
                name:true,
                role:true,
                createdAt:true,
            }
        })
    }
}