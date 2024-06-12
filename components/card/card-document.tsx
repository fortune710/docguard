"use client"
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";



export default function CardDocument({ cardSideKey }: { cardSideKey: string }) {

    const { isLoading, data: url } = useQuery({
        queryKey: ["card-side", cardSideKey],
        queryFn: async () => {
            const response = await fetch("/api/card", {
                method: "POST",
                body: JSON.stringify({
                    card_key: cardSideKey
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const { data } = await response.json()
            const url = data.url
            return url
        },
        enabled: !!cardSideKey,
        refetchInterval: 5 * 60 * 1000
    })

    if(isLoading) {
        return (
            <Card className="cursor-pointer">
                <CardContent className="h-[180px] p-0 flex items-center justify-center">
                    <Image 
                        src="/loading-spinner.svg" 
                        alt="Loading Spinner" 
                        width={60} 
                        height={60}
                    />
                </CardContent>
            </Card>
        )
    }

    

    if(!url) {
        return (
            <Card className="cursor-pointer">
                <CardContent className="h-[180px] p-0 flex items-center justify-center">
                    <p className="text-sm">No Card Side</p>
                </CardContent>
            </Card>
        )
    }
    
    return (
        <Card>
            <CardContent className="h-[180px] p-0">
                <img 
                    src={url} 
                    alt="Card Side" 
                    className="w-full h-full rounded-md" 
                />
            </CardContent>
        </Card>
    )
}