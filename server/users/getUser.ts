import { prisma } from "@/prisma"

const getUser = async (email: string) => {
    const user = await prisma.user.findUnique({
        where: {
            email
        },
        select: {
            password: false,
        }
    })

    return user
}

export default getUser;