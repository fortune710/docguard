import { prisma } from "@/prisma";
import createUser from "@/server/users/createUser";
import getUser from "@/server/users/getUser";
import getUserWithEmail from "@/server/users/getUserWithEmail";
import { createVerification } from "@/server/verification/createVerification";
import { sendVerificationEmail } from "@/services/emails/sendVerificationEmail";
import { generateOTP } from "@/utils/functions";
import { type NextRequest } from "next/server"

interface User {
    email: string
    password?: string
    name: string
}

export async function POST(req: NextRequest) {
    const userData = await req.json() as User;

    const existingUser = await getUserWithEmail(userData.email)
    if (!existingUser) {
        const newUser = await createUser(userData);
        const otp = generateOTP();
        
        await Promise.all([
            await createVerification(newUser.id, otp),
            await sendVerificationEmail(newUser?.email!, otp)
        ])
    
        return Response.json({
            data: newUser,
            message: "User created successfully"
        }, { status: 201 })
    }
    
    return Response.json({
        data: existingUser,
        message: "User with email already exists"
    }, { status: 409 })
}