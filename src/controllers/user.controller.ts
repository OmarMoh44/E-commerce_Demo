import { getUserService, updateUserService } from "@services/user.service";
import { validateEmail, validateFirstName, validateLastName, validatePassword } from "@validators/user.validator";
import { Request, Response } from "express";


export async function getUserController(req: Request, res: Response) {
    const userId = req.userId;
    const user = await getUserService(userId);
    res.json(user);
}

export async function updateUserController(req: Request, res: Response) {
    const userId = req.userId;
    const userData = req.body;
    if (userData['firstName']) validateFirstName(userData['firstName']);
    if (userData['lastName']) validateLastName(userData['lastName']);
    if (userData['email']) validateEmail(userData['email']);
    if (userData['password']) validatePassword(userData['password']);
    const updatedUser = await updateUserService(userData, userId);
    res.json(updatedUser);
}
