import { authLoginController, authLogOutController, authSignUpController } from "@controllers/auth.controller";
import userAuth from "@middlewares/auth.middleware";
import { Router } from "express";
import asyncHandler from "express-async-handler";


const router = Router();

router.post('/signup', asyncHandler(authSignUpController));
router.post('/login', asyncHandler(authLoginController));
router.post('/logout', userAuth, asyncHandler(authLogOutController));

export default router;