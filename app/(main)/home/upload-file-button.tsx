'use client'
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery"

export default function UploadNewFile() {
    const isMobile = useMediaQuery('(max-width: 640px)');

    return (
        <>
         {
            !isMobile ?
            <Button className="rounded-lg">
                Add Document
            </Button>
            :

            <Button className="w-full rounded-lg">
                Scan from File
            </Button>
                        
        
         }
        </>
    )
}