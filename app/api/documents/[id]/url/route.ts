import { prisma } from "@/prisma";
import getFile from "@/services/gcp-storage/getFile";


export async function GET(req: Request, { params }: {
    params: { id: string }
}) {
    //const { id } = params;
    const url = await getFile(params.id);

    

    return Response.json({ url })
}