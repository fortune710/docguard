import prisma from "@/lib/prisma"

const findUsersDocumentCategory = async (user_id: string, category: string) => {
    const documents = await prisma.document.findMany({
        where: { user_id, category: category as any }
    })

    return documents;
}

export default findUsersDocumentCategory;