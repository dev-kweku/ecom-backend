import { Router } from "express";
import { OrderController } from "./order.controller";
import { isAuthenticated } from "middleware/auth";

const router=Router();

router.use(isAuthenticated)

router.post('/checkout',OrderController.checkout);
router.get('/',OrderController.myOrders);
router.get("/:id",OrderController.orderDetails)


const OrderRouter=router;

export default OrderRouter;
