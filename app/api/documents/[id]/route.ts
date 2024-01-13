import { prisma } from "@/prisma";
import { NextRequest } from "next/server"


export default async function GET(req: Request, { params }: {
    params: { id: string }
}) {
    const { id } = params;

    const document = await prisma.document.findFirst({
        where: {
            id
        }
    })

    return Response.json(document)
}