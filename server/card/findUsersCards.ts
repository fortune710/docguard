import prisma from "@/lib/prisma"


const findUsersCards = async (user_id: string) => {
    const cards = await prisma.document.findMany({
        where: { 
            user_id,
            is_card: true,
        },
        include: {
            card: true
        }
    })

    return cards
}

export default findUsersCards;