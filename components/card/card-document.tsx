import getFile from "@/services/gcp-storage/getFile";
import { Card, CardContent } from "../ui/card";



export default async function CardDocument({ cardSideKey }: { cardSideKey: string }) {
    const url = await getFile(cardSideKey);

    if(!url) {
        return (
            <Card className="cursor-pointer">
                <CardContent className="h-[200px] p-0 flex items-center justify-center">
                    <p className="text-sm">No Card Side</p>
                </CardContent>
            </Card>
        )
    }
    
    return (
        <Card>
            <CardContent className="h-[200px] p-0">
                <img 
                    src={url} 
                    alt="Card Side" 
                    className="w-full h-full rounded-md" 
                />
            </CardContent>
        </Card>
    )
}