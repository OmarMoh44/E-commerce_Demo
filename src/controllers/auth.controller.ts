import { authLoginService, authLogOutService, authSignUpService } from "@services/auth.service";
import { validateLogin, validateSignUp } from "@validators/user.validator";
import { Request, Response } from "express";



export async function authLoginController(req: Request, res: Response) {
    const user = req.body;
    validateLogin(user);
    const responseBody = await authLoginService(user.email, user.password, res);
    res.status(200).json(responseBody);
}

export async function authSignUpController(req: Request, res: Response) {
    const user = req.body;
    validateSignUp(user);
    const responseBody = await authSignUpService(user, res);
    res.status(201).json(responseBody);
}

export async function authLogOutController(req: Request, res: Response) {
    const responseBody = authLogOutService(res);
    res.status(200).json(responseBody);
}