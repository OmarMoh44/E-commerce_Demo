import HttpError from "@errors/httpError";
import { findUserById, updateUser } from "@repositories/user.repository";
import bcrypt from 'bcrypt';


export async function getUserService(userId: number) {
    const userDetails = await findUserById(userId);
    if (!userDetails) {
        throw new HttpError("User not found", 404);
    }
    delete (userDetails as any).hashedPassword;
    return userDetails;
}

export async function updateUserService(userData: any, userId: number) {
    const userDetails = await findUserById(userId);
    if (!userDetails) {
        throw new HttpError("User not found", 404);
    }
    let updatedData = {};
    const userAttributes = ['firstName', 'lastName', 'email'];
    userAttributes.forEach(attr => {
        if (userData[attr] !== undefined) {
            (updatedData as any)[attr] = userData[attr];
        }
    });
    if (userData['password'] !== undefined) {
        (updatedData as any).hashedPassword = bcrypt.hashSync(userData['password'], 11);
    }
    const updatedUser = await updateUser(updatedData, userId);
    delete (updatedUser as any).hashedPassword;
    return {
        updatedUser,
        message: "Update is done"
    };
}