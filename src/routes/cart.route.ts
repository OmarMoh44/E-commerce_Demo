import { addCartController, deleteCartController } from "@controllers/cart.controller";
import { Router } from "express";
import asyncHandler from "express-async-handler";


const router = Router();

router.post('/', asyncHandler(addCartController));
router.delete('/', asyncHandler(deleteCartController))

export default router;