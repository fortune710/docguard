
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import Link from "next/link";
import QRCodePopover from "@/components/qr-code-popover";
import { useQuery } from "@tanstack/react-query";

interface DocumentLinkProps {
    fileKey: string,
}



export function DocumentLink({ fileKey }: DocumentLinkProps) {
    
    const { isLoading, data: url } = useQuery({
        queryKey: ["fileKey", fileKey], 
        queryFn: async () => {
            const response = await fetch(`/api/documents/url?file_key=${fileKey}`);
            const res = await response.json();
            return res.data.url;
        },
        refetchInterval: 5 * 60 * 1000,
    })

    return (
        <>
            {/* Mobile View */}
            <div className="w-full md:hidden">
                <Link 
                    aria-disabled={isLoading} 
                    href={url ?? ""} 
                    target="_blank"
                >
                    <Button 
                        variant='ghost'
                        className="font-semibold" 
                        //onClick={openDocument}
                    >
                        View Document
                    </Button>
                </Link>

                <QRCodePopover documentUrl={url}>
                    <Button variant='ghost'>
                        Get QR Code
                    </Button>
                </QRCodePopover>
            </div>
        
            {/* Desktop View */}
            <div className="max-sm:hidden">
                <DropdownMenuItem disabled={isLoading || !url}>
                    <Link 
                        aria-disabled={isLoading || !url} 
                        href={url ?? ""}
                        target="_blank"
                    >
                        View Document
                    </Link>
                </DropdownMenuItem>

                <Link target="_blank" href={"qrcode?url=" + url}>
                    <DropdownMenuItem disabled={isLoading || !url}>
                        Get QR Code
                    </DropdownMenuItem>
                </Link>

            </div>
        
        </>
    )
}