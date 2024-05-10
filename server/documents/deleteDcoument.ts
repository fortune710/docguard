import prisma from "@/lib/prisma";

const deleteDocument = async (document_id: string) => {
    if (document_id) return;

    const result = await prisma.document.deleteMany({
        where: {
            id: document_id
        }
    })
    return result;
}

export default deleteDocument;