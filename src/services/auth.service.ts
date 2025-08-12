import HttpError from "@errors/httpError";
import { UserInfo } from "@models/userInfo";
import { Role } from "@prisma/client";
import { addUser, findUserByEmail } from "@repositories/user.repository";
import bcrypt from 'bcrypt';
import { Response } from "express";
import jwt from "jsonwebtoken";


export const authLoginService = async (email: string, password: string, res: Response) => {
    const user = await findUserByEmail(email);
    if (!user) throw new HttpError("User with email: " + email + " not found", 422);
    if (!bcrypt.compareSync(password, user.hashedPassword)) {
        throw new HttpError("Invalid email or password", 401);
    }
    const userToken = createToken(user.id, user.role);
    createCookie(userToken, res);
    delete (user as any).hashedPassword;
    return { user, userToken };
};

export const authSignUpService = async (user: any, res: Response) => {
    const userAttributes = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        role: user.role,
    }
    const foundUser = await findUserByEmail(userAttributes.email);
    if (foundUser) throw new HttpError("User with email: " + userAttributes.email + " already exist", 422);
    const hashedPassword = bcrypt.hashSync(userAttributes.password, 11);
    const newUser = await addUser(userAttributes, hashedPassword);
    const userToken = createToken(newUser.id, newUser.role);
    createCookie(userToken, res);
    delete (newUser as any).hashedPassword;
    return { newUser, userToken };
}

export const authLogOutService = (res: Response) => {
    clearTokenCookie(res);
    return { message: "Logged out successfully" };
};

function createToken(id: number, role: Role) {
    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET as string,
        {
            expiresIn: process.env.JWT_EXPIRE as any,
        }
    );
}

function createCookie(userToken: string, res: Response) {
    res.cookie("token", userToken, {
        expires: new Date(
            Date.now() + parseInt(process.env.COOKIE_EXPIRE as string) * 1000 * 60 * 60
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    });
}

function clearTokenCookie(res: Response) {
    res.clearCookie("token", {
        httpOnly: true,
    });
}