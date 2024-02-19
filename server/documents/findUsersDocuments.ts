import prisma from "@/lib/prisma"

const findUsersDocuments = async (user_id: string) => {
    const documents = await prisma.document.findMany({
        where: { user_id }
    })

    return documents;
}

export default findUsersDocuments;