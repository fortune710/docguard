import { prisma } from "@/prisma"
import { User } from "../types";


const updateUser = async (updatedUser: Partial<User>, email?: string, id?: string) => {
    const user = await prisma.user.update({
        where: { id, email },
        data: {
            ...updatedUser
        }
    })

    return user
}

export default updateUser;