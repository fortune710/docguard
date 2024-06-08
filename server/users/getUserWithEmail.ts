import { prisma } from "@/prisma"


const getUserWithEmail = async (email: string) => {
    const user = await prisma.user.findFirst({
        where: { email },
    })

    return user
}

export default getUserWithEmail;