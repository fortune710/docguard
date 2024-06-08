import prisma from "@/lib/prisma"
import { validatePassword } from "../users/validatePassword";

export const checkVerification = async (user_id: string, code: string) => {

    const existingVerification = await prisma.verificationCode.findFirst({
        where: {
            user_id
        }
    })

    if (!existingVerification) {
        return { valid: false, message: "User Verification does not exist" }
    }

    if (existingVerification.expires_on < new Date()) {
        return { 
            valid: false,
            message: "OTP has expired"
        }
    }

    if (!validatePassword(code, existingVerification.code)) {
        return {
            valid: false,
            message: "OTP entered is not correct"
        }
    }

    await prisma.user.update({
        where: {
            id: user_id
        },
        data: {
            emailVerified: new Date()
        }
    })

    return {
        valid: true,
        message: "OTP entered is validated successfully"
    }
}