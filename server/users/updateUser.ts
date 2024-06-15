import { prisma } from "@/prisma"
import { TUpdateUser } from "../types";


const updateUser = async (updatedUser: Partial<TUpdateUser>, email?: string, id?: string) => {
    const user = await prisma.user.update({
        where: { id, email },
        data: {
            ...updatedUser
        }
    })

    return user
}

export default updateUser;