import { prisma } from "@/prisma"
import hashPassword from "./hashPassword"

const createUser = async (data: any) => {
    const hashedPassword = hashPassword(data.password);

    const newUser = await prisma.user.create({
        data: {
            ...data,
            image: `https://api.dicebear.com/7.x/adventurer/svg?seed=${data.name}`,
            password: hashedPassword
        },
        select: {
            id: true,
            name: true,
            email: true,
            password: false
        }
    })

    return newUser
}

export default createUser;