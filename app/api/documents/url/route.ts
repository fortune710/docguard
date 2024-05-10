import getFile from "@/services/gcp-storage/getFile";


export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("file_key")!;

    if(!key) return Response.json({
        message: "No Key!"
    }, {
        status: 400
    })

    try {
        const url = await getFile(key);
        return Response.json({ data: { url } })

    } catch {
        return Response.json({ message: "Error while getting URL from Bucket" }, {
            status: 500
        })
    }

    

}