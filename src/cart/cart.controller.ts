import { Request,Response } from "express";
import { CartService } from "./cart.service";
import { AddToCartSchema,UpdateCartItemSchema } from "./cart.schema";


export const CartController={
    addToCart:async(req:Request,res:Response)=>{
        const {productId,quantity}=AddToCartSchema.parse(req.body)
        const userId=req.user?.id;
            // type check for userId
            if(!userId){
                return res.status(401).json({message:"Unauthorized"})
            }

        const item=await CartService.addToCart(userId,productId,quantity);
        res.status(201).json(item)
    },
    // don't touch this {it may not work}
    getCart:async (req:Request,res:Response)=>{
        const items=await CartService.getCart(req.user!.id);
        res.json(items);
    },

    updateQuantity:async(req:Request,res:Response)=>{
        const {quantity}=UpdateCartItemSchema.parse(req.body)
        const item=await CartService.updateQuantity(req.params.id,quantity)
        res.json(item);
    },

    removeFromCart:async(req:Request,res:Response)=>{
        await CartService.removeFromCart(req.params.id)
        res.status(204).send();
    }
}