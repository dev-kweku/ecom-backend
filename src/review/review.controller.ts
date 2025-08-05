import { Request,Response } from "express";
import { ReviewService } from "./review.service";
import { CreateReviewSchema } from "./review.schema";

export const ReviewController={
    create:async(req:Request,res:Response)=>{
        const userId=req.user!.id;
        const {productId}=req.params

        const parsed=CreateReviewSchema.safeParse(req.body)
        if(!parsed.success) return res.status(400).json({error:parsed.error.format()});

        try{
            const review=await ReviewService.create(productId,userId,parsed.data)
            return res.status(201).json(review);
        }catch(err:any){
            res.status(400).json({error:err.message});
        }
    }
}


