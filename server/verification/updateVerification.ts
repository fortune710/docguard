import prisma from "@/lib/prisma"
import hashPassword from "../users/hashPassword";

export const updateVerification = async (user_id: string, code: string) => {
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
                expires_on: new Date(),
                user_id
            }
        })
    }

    return await prisma.verificationCode.update({
        where: {
            id: existingVerification?.id,
            user_id
        },
        data: {
            code: hashedCode,
            expires_on: new Date(Date.now() + 10 * 60 * 1000)
        }
    })

}