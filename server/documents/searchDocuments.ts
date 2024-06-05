import prisma from "@/lib/prisma"


const searchDocuments = async (user_id: string, search_query: string) => {
    if (!search_query) return []
    
    const documents = await prisma.document.findMany({
        where: {
            user_id,
            title: {
                contains: search_query,
                mode: 'insensitive'
            }
        },
        select: {
            title: true,
            id: true,
            description: true,
            file_key: true,
            category: true
        },
        take: 4, //Number of results returned from the DB
        orderBy: {
            createdAt: 'desc'
        }
    })

    return documents
}

export default searchDocuments;