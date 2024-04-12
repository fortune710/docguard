
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import getFile from "@/services/gcp-storage/getFile";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface DocumentLinkProps {
    fileKey: string,
}

export const revalidate = 5 * 60 //every 5 minutes


export async function DocumentLink({ fileKey }: DocumentLinkProps) {
    
    const url = await getFile(fileKey);

    return (
        <>
            <div className="flex items-center justify-between w-full md:hidden">
                <Link href={url} target="_blank">
                    <Button 
                        variant='ghost'
                        className="font-semibold" 
                        //onClick={openDocument}
                    >
                        View Document
                    </Button>
                </Link>

                <Button variant={'ghost'} disabled>
                    Get QR Code
                    <span className="bg-zinc-900 ml-2 text-xs text-white py-0.5 px-1 rounded-xl font-semibold">
                        Coming Soon
                    </span>
                </Button>
            </div>

            <div className="max-sm:hidden">
                <DropdownMenuItem>
                    <Link href={url}>
                        View Document
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                    Get QR Code
                    <span className="bg-zinc-900 ml-2 text-xs text-white py-0.5 px-1 rounded-xl font-semibold">
                        Coming Soon
                    </span>
                </DropdownMenuItem>


            </div>
        
        </>
    )
}