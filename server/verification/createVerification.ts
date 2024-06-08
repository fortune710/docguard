import prisma from "@/lib/prisma"
import hashPassword from "../users/hashPassword";

export const createVerification = async (user_id: string, code: string) => {
    const hashedCode = hashPassword(code);

    const existingVerification = await prisma.verificationCode.findFirst({
        where: {
            user_id
        }
    })

    if (!existingVerification) {   
        return await prisma.verificationCode.create({
            data: {
                code: hashedCode,
                expires_on: new Date(Date.now() + 10 * 60 * 1000),
                user_id
            }
        })
    }

    if (existingVerification.expires_on < new Date()) {
        return await prisma.verificationCode.update({
            where: {
                id: existingVerification.id
            },
            data: {
                expires_on: new Date(Date.now() + 10 * 60 * 1000),
                code: hashedCode,
            }
        })
    }

    return existingVerification


}