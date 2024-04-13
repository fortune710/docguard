import prisma from "@/lib/prisma"
import { cache } from "react";

const findUsersRecentlyAdded = cache(async (user_id: string) => {
    const documents = await prisma.document.findMany({
        where: { user_id },
        orderBy: {
            createdAt: "desc"
        },
        take: 5
    })

    return documents;
})

export default findUsersRecentlyAdded;