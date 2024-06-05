import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer"
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuLabel, 
    DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { DocumentLink } from "@/components/documents/document-link"
import { MoreHorizontal } from "lucide-react"

interface SearchActionsProps {
    documentKey: string,
    documentTitle: string
}

const SearchActions = ({ documentKey, documentTitle }: SearchActionsProps) => {
    const isMobile = useMediaQuery('(max-width: 768px)');

    if(!isMobile) {
        return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button>
                    <MoreHorizontal className="h-4 w-4" />                                    
                </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DocumentLink fileKey={documentKey}/>
            </DropdownMenuContent>
        </DropdownMenu>

        )
    }

    return (
        <Drawer>
            <DrawerTrigger asChild>
                <button>
                    <MoreHorizontal className="h-4 w-4" />                                    
                </button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>{documentTitle}</DrawerTitle>
                </DrawerHeader>

                <div className="w-full">
                    <DocumentLink fileKey={documentKey}/>
                </div>
            </DrawerContent>
            
        </Drawer>

    )
}

export default SearchActions;
