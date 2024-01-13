import { prisma } from "@/prisma";
//import { NextRequest } from "next/server"


export default async function GET(req: Request, { params }: {
    params: { id: string }
}) {
    const { id } = params;

    const document = await prisma.user.findFirst({
        where: { id },
        select: {
            id: true,
            full_name: true,
            email: true,
        }
    })

    return Response.json(document)
}