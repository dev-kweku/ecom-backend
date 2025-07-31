import { Request,Response } from "express";
import { CategoryService } from "./category.service";
import { CreateCategorySchema,UpdateCategorySchema } from "./cartegory.schema";



export const CategoryController={
    create:async(req:Request,res:Response)=>{
        const body=CreateCategorySchema.parse(req.body);
        const category=await CategoryService.create(body)
        res.status(201).json(category);
    },

    getAll:async(_req:Request,res:Response)=>{
        const categories=await CategoryService.getAll()
        res.json(categories);
    },

    getById:async(req:Request,res:Response)=>{
        const category=await CategoryService.getById(req.params.id);
        if(!category) return res.status(404).json({message:'Not found'})
            res.json(category);
    },

    update:async(req:Request,res:Response)=>{
        const body=UpdateCategorySchema.parse(req.body);
        const category=await CategoryService.update(req.params.id,body)
        res.json(category);
    },

    delete:async (req:Request,res:Response)=>{
        await CategoryService.delete(req.params.id);
        res.status(204).send("category deleted")
    }
}

