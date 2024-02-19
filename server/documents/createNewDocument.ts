import prisma from "@/lib/prisma"

const createNewDocument = async (data: any) => {
    const documents = await prisma.document.create({ data })

    return documents;
}

export default createNewDocument;