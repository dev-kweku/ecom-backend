import { validate } from "@common/middleware/validate";
import { SignUpSchema,loginSchema } from "./auth.schema";
// import express from "express";
import { protect,restrictTo } from "./auth.middleware";
import { AuthController } from "./auth.controller";
// const router=express.Router()
import { Router } from "express";

const router=Router();

router.post('/signup',validate(SignUpSchema),AuthController.signup);
router.post('/login',validate(loginSchema),AuthController.login);
router.get('/me',protect,AuthController.me);

// admin-only test route
router.get('/admin/panel',protect,restrictTo('ADMIN'),(req,res)=>{
    res.json({message:'Welcome, Admin'})
})

/****
 * POST /api/auth/signup
  → validate using zod (auth.schema.ts)
  → pass parsed input to AuthService
  → return tokens + user

 */

  router.post('/refresh-token',AuthController.refreshToken)

export default router;

