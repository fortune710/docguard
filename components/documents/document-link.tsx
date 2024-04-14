
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import getFile from "@/services/gcp-storage/getFile";
import Link from "next/link";
import QRCodePopover from "@/components/qr-code-popover";

interface DocumentLinkProps {
    fileKey: string,
}

export const revalidate = 5 * 60 //every 5 minutes


export async function DocumentLink({ fileKey }: DocumentLinkProps) {
    
    const url = await getFile(fileKey);

    return (
        <>
            {/* Mobile View */}
            <div className="w-full md:hidden">
                <Link href={url} target="_blank">
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
                <DropdownMenuItem>
                    <Link href={url}>
                        View Document
                    </Link>
                </DropdownMenuItem>

                <Link target="_blank" href={"qrcode?url=" + url}>
                    <DropdownMenuItem>
                        Get QR Code
                    </DropdownMenuItem>
                </Link>

            </div>
        
        </>
    )
}