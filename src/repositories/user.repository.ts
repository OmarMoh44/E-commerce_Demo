import prisma from "@DB";
import HttpError from "@errors/httpError";
import { UserInfo } from "@models/userInfo";

export async function findUserById(userId: number) {
    return await prisma.user.findUnique({
        where: { id: userId }
    });
}

export async function findUserByEmail(email: string) {
    return await prisma.user.findUnique({
        where: { email }
    });
}

export async function addUser(userInfo: UserInfo, hashedPassword: string) {
    try {
        delete (userInfo as any).password;
        return await prisma.user.create({
            data: {
                ...userInfo,
                hashedPassword
            }
        });
    } catch (error) {
        throw new HttpError("Error adding user", 500);
    }
}

export async function updateUser(userData: any, userId: number) {
    try {
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: userData
        });
        return updatedUser;
    } catch (error) {
        throw new HttpError("Error updating user", 500);
    }
}
