import {Router} from "express"
import { CartController } from "./cart.controller"
// look authenticated
import { isAuthenticated } from "middleware/auth";

const router=Router();
router.use(isAuthenticated)

router.post('/',CartController.addToCart);
router.get('/',CartController.getCart);
router.put('/:id',CartController.updateQuantity);
router.delete('/:id',CartController.removeFromCart);


const cartRoute=router;

export default cartRoute;