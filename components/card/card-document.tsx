"use client"
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "../ui/card";



export default function CardDocument({ cardSideKey }: { cardSideKey: string }) {
    //const url = await getFile(cardSideKey);

    const [url, setUrl] = useState<string>("");

    const _ = useMemo(() => {
        if(!cardSideKey) return;

        async function getUrl() {
            const response = await fetch(`/api/card?card_key=${cardSideKey}`, {
                next: {
                    tags: [cardSideKey],
                    revalidate: 5 * 60 * 1000,
                }
            });
            const { data } = await response.json()
            setUrl(data.url);
        }
        getUrl()
    }, [cardSideKey])
    
    /*
    useEffect(() => {
        if(!cardSideKey) return;

        console.log(cardSideKey)
        async function getUrl() {
            const response = await fetch(`/api/card/${cardSideKey}`, {
                next: {
                    tags: [cardSideKey],
                    revalidate: 5 * 60 * 1000,
                }
            });
            const { data } = await response.json()
            setUrl(data.url);
        }
        getUrl()
    }, [cardSideKey])*/


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