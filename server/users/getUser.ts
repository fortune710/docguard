import { prisma } from "@/prisma"

const getUser = async (email: string) => {
    const user = await prisma.user.findFirst({
        where: {
            email
        },
    })

    return user
}

export default getUser;