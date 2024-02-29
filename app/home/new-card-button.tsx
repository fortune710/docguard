'use client'

import FileUploadDrawer from "./file-upload-drawer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { StringParam, useQueryParam, withDefault } from "use-query-params";


export default function NewCardButton({ userId }: { userId: string }) {

    const [_, setIsCard] = useQueryParam('is_card', withDefault(StringParam, null, true))
    
    return (
        <FileUploadDrawer
            userId={userId}
            uploadFileButton={
                <Button 
                    className="flex items-center justify-center h-[150px] w-full rounded-lg border border-dashed"
                    variant='ghost'
                    onClick={() => setIsCard('true')}
                >
                    <Plus/>
                </Button>
            }
        />
    )
}