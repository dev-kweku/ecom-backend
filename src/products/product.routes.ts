import { Router } from "express";
import { ProductController } from "./product.controller";
import { validate } from "@common/middleware/validate";
import { protect } from "@auth/auth.middleware";
import { CreateProductSchema,updateProductSchema } from "./product.schema";

const router=Router()

router.get('/',ProductController.findAll)
router.get('/:id',ProductController.findOne)


router.post('/',protect,validate(CreateProductSchema),ProductController.create);
router.put('/:id',protect,validate(updateProductSchema),ProductController.update);
router.delete('/:id',protect,ProductController.delete)

const productRoute=router;
export default productRoute;
