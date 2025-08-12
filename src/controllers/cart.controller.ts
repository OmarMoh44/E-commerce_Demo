import { addCartService, deleteCartService } from "@services/cart.service";
import { Request, Response } from "express";


export async function addCartController(req: Request, res: Response) {
    const userId = req.userId;
    const responseBody = await addCartService(userId);
    res.status(201).json(responseBody);
}

export async function deleteCartController(req: Request, res: Response) {
    const userId = req.userId;
    await deleteCartService(userId);
    res.status(204).json({
        message: "Cart deleted successfully"
    });
}