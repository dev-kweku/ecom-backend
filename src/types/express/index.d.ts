import {Prisma} from "@prisma/client"

declare global{
    namespace Express{
        interface Request{
            user?:{
                id :string;
                email:string;
                role:'USER'|'ADMIN';
            }
        }
    }
}