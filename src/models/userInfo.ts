import { Role } from "@prisma/client";

export type UserInfo = {
    firstName: string
    lastName: string
    email: string
    password: string
    role: Role
};