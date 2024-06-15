import { prisma } from "@/prisma"


const getUserWithEmail = async (email: string) => {
    const user = await prisma.user.findFirst({
        where: { email },
        select: {
            password: false,
            id: true,
            name: true,
            email: true,
            emailVerified: true
        }
    })

    return user
}

export default getUserWithEmail;