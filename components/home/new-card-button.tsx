'use client'

import FileUploadDrawer from "./file-upload-drawer";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Plus } from "lucide-react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";


export default function NewCardButton({ userId }: { userId: string }) {

    const [_, setIsCard] = useQueryParam('is_card', withDefault(StringParam, null, true));
    const isMobile = useMediaQuery('(max-width: 768px)');

    if (!isMobile) {
        return (
            <FileUploadDrawer
                userId={userId}
                uploadFileButton={
                    <Button 
                        size="sm" 
                        variant="outline"
                        className="h-8 gap-1"
                        onClick={() => setIsCard('true')}

                    >
                        <Plus className="h-3.5 w-3.5" />
                        <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                            Add New
                        </span>
                    </Button>                        
                }
            />

        )
    }
    
    return (
        <FileUploadDrawer
            userId={userId}
            uploadFileButton={
                    <Button 
                        className="flex items-center justify-center h-[200px] w-full rounded-lg border border-dashed"
                        variant='ghost'
                        onClick={() => setIsCard('true')}
                    >
                        <Plus/>
                    </Button>
            }
        />
    )
}