import prisma from "@/lib/prisma"


const createNewCard = async (data: any) => {
    const card = await prisma.card.create({ data })
    return card;
}

export default createNewCard;