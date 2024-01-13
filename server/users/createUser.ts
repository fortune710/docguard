import { prisma } from "@/prisma"

const createUser = async (data: any) => {
    const newUser = await prisma.user.create({
        data,
        select: {
            id: true,
            full_name: true,
            email: true
        }
    })

    return newUser
}

export default createUser;