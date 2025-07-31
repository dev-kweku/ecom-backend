import express from 'express'
import {Request,Response} from 'express'
import { ProductService } from './product.service'

export class ProductController{
    static async create(req:Request,res:Response){
        const product=await ProductService.create(req.body);
        res.status(201).json(product);
    }

    static async update(req:Request,res:Response){
        const product=await ProductService.update(req.params.id,req.body)
        res.json(product)
    }

    static async delete(req:Request,res:Response){
        await ProductService.delete(req.params.id)
        res.status(204).send("product deleted")
    }

    static async findAll(_req:Request,res:Response){
        const products=await ProductService.findAll();
        res.json(products)
    }

    static async findOne(req:Request,res:Response){
        const product=await ProductService.findById(req.params.id);
        if(!product) return res.status(404).json({message:`Product not found`})
            res.json(product);
    }
}