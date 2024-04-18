'use client'
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery"

export default function UploadNewFile() {
    const isMobile = useMediaQuery('(max-width: 640px)');

    return (
        <Button className="max-md:w-full rounded-lg">
            Scan from File
        </Button>
    )
}