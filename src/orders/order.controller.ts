import { Request,Response } from "express";
import { OrderService } from "./order.service";


export const OrderController={
    checkout:async(req:Request,res:Response)=>{
        try{
            const userId=req.user?.id;
            if(!userId) return res.status(401).json({message:"User not Authenticated"})
            const order=await OrderService.createOrder(userId)
            res.status(201).json(order);
        }catch(err){
            res.status(400).json({message:(err as Error).message})
        }
    },
    myOrders:async(req:Request,res:Response)=>{
        const userId=req.user?.id;
        if(!userId) return res.status(401).json({message:"User not authenticated"});
        const orders=await OrderService.getUserOrder(userId)
        res.json(orders);
    },

    orderDetails:async(req:Request,res:Response)=>{
        const userId=req.user?.id;
        if(!userId) return res.status(401).json({message:"User not authenticated"})
        const order=await OrderService.getOrderById(req.params.id,userId)
    if(!order) return res.status(404).json({message:"order not found"})
        res.json(order);
    }
}

