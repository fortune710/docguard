'use client'
import { Button } from "@/components/ui/button";
import getFile from "@/services/s3/getFile";
import { useRouter } from "next/navigation";

interface DocumentLinkProps {
    fileKey: string
}


export default function DocumentLink({ fileKey }: DocumentLinkProps) {
    
    const router = useRouter();

    const openDocument = async () => {
        const url = await getFile(fileKey);
        router.push(url);
    }

    return (
        <div className="flex items-center justify-between w-full">
            <Button 
                className="font-semibold" 
                onClick={openDocument}
            >
                View Document
            </Button>

            <Button variant={'ghost'} disabled>
                Get QR Code
                <span className="bg-zinc-900 ml-2 text-xs text-white py-0.5 px-1 rounded-xl font-semibold">
                    Coming Soon
                </span>
            </Button>

        </div>
    )
}