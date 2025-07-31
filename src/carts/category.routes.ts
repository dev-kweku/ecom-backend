import { Router } from "express";
import { CategoryController } from "./category.controller";

const router=Router()

router.post('/',CategoryController.create)
router.get('/',CategoryController.getAll)
router.get('/:id',CategoryController.getById)
router.put('/:id',CategoryController.update)
router.delete('/:id',CategoryController.delete)


const CategoryRouter=router;
export default CategoryRouter;

