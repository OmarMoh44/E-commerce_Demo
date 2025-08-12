import { getUserController, updateUserController } from "@controllers/user.controller";
import asyncHandler from "express-async-handler";
import { Router } from "express";

const router = Router();


router.get("/", asyncHandler(getUserController));
router.patch("/", asyncHandler(updateUserController));

export default router;