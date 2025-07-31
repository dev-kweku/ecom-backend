import express from "express"
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import {config} from "dotenv"
import productRoute from "products/product.routes"
import CategoryRouter from "category/category.routes"

config();
const app=express()
app.use(cors({origin:true,credentials:true}))
app.use(helmet())
app.use(express.json())
app.use(cookieParser())


// ping
app.get('/ping',(_,res)=>res.send('pong'))

app.use('/api/products',productRoute);
app.use('/categories',CategoryRouter);

export default app;