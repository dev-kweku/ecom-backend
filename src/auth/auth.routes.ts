import { validate } from "@common/middleware/validate";
import { SignUpSchema,loginSchema } from "./auth.schema";
import express from "express";
import { AuthController } from "./auth.controller";
const router=express.Router()

router.post('/signup',validate(SignUpSchema),AuthController.signup);
router.post('/login',validate(loginSchema),AuthController.login);
