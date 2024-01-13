import { prisma } from "@/prisma"

const updateDocument = async (id: string, newData: any) => {
    const documents = await prisma.document.update({
        data: newData,
        where: { id }
    })

    return documents;
}

export default updateDocument;