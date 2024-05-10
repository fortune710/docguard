import { prisma } from "@/prisma";
import deleteDocument from "@/server/documents/deleteDcoument";
import { NextRequest } from "next/server"

interface Params {
    params: {
        id: string
    }
}

export async function GET(req: Request, { params }: Params) {
    const { id } = params;

    const document = await prisma.document.findFirst({
        where: {
            id
        }
    })

    return Response.json(document)
}

export async function DELETE(req: Request, { params }: Params) {
    if (!params.id) return Response.json({ message: "No Id provided in URL" }, {
        status: 400
    })
    try {
        await deleteDocument(params.id)
        return Response.json({ message: "Deleted Document Successfully" }, {
            status: 204
        })
    } catch {
        return Response.json({ message: "Error While Deleting Document" }, {
            status: 500
        })
    }
}