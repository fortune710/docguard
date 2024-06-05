import searchDocuments from "@/server/documents/searchDocuments";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const searchQuery = searchParams.get("query")!;
    const userId = searchParams.get("user_id")!;

    if (!searchQuery) {
        return Response.json({
            data: [],
            message: "No search query provided"
        }, { status: 200 })
    }

    try {
        const documents = await searchDocuments(userId, searchQuery);
    
        return Response.json({
            data: documents,
            mesage: "Documents fetched successfully"
        }, { status: 200 })
    } catch {
        return Response.json({
            data: null,
            message: "There was an error while trying to get documents"
        }, { status: 500 })
    }

}