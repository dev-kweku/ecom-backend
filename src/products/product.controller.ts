import express from 'express'
import {Request,Response} from 'express'
import { ProductService } from './product.service'

export class ProductController{
    static async create(req:Request,res:Response){
        const product=await ProductService.create(req.body);
        res.status(201).json(product);
    }
}