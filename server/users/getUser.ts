import { prisma } from "@/prisma"
import { cache } from "react";



const getUser = cache(async (email: string) => {
    const user = await prisma.user.findFirst({
        where: { email },
    })

    return user
})

export default getUser;