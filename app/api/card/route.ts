import getFile from "@/services/gcp-storage/getFile";


export async function POST(req: Request, { params }: {
    params: { key: string }

}) {

    const { card_key: key } = await req.json()

    if(!key) return Response.json({
        message: "No Key!"
    }, {
        status: 400
    })
    try {
        const url = await getFile(key)
        
        return Response.json({
            data: {
                url
            }
        })
    } catch {
        return Response.error()

    }

}