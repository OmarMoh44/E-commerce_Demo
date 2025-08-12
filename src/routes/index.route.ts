import { Router } from "express";
import authRouter from './auth.route';
import userRouter from './user.route';
import productRouter from './product.route';
import categoryRouter from './category.route'
import cartRouter from './cart.route';
import cartItemRouter from './cartItem.route';
import userAuth from "@middlewares/auth.middleware";
import { buyerMiddleware } from "@middlewares/permission.middleware";

const router = Router();

router.use('/auth', authRouter);
router.use(userAuth);
router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/categories', categoryRouter);
router.use('/cart', buyerMiddleware, cartRouter);
router.use('/cartItems', buyerMiddleware, cartItemRouter);

export default router;
