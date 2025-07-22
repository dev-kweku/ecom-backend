import express from "express"
import cors from "cors"
import helmet from "helmet"
import cookieParser from "cookie-parser"
import {config} from "dotenv"


config();
const app=express()
app.use(cors({origin:true,credentials:true}))
app.use(helmet())
app.use(express.json())
app.use(cookieParser())


// ping
app.get('/ping',(_,res)=>res.send('pong'))

export default app;