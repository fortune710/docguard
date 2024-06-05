'use client'
import { 
    AlertDialog, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogFooter, 
    AlertDialogTrigger 
} from "@/components/ui/alert-dialog"
import Searchbar from "./searchbar"
import SearchResults from "./search-results"
import useSearch from "@/hooks/useSearch"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "../ui/button"

interface SearchModalProps {
    userId: string
}

export default function SearchModal({ userId }: SearchModalProps) {
    const { 
        searchQuery, 
        updateSearchQuery, 
        isLoading, 
        documents
    } = useSearch(userId);

    const isMobile = useMediaQuery('(max-width: 768px)');

    if (!isMobile) {
        return (
            <AlertDialog defaultOpen={!!searchQuery}>
                <AlertDialogTrigger className="w-full">
                    <Searchbar disabled={false}/>
                </AlertDialogTrigger>

                <AlertDialogContent>
                    
                    <div className="w-full">
                        <Searchbar 
                            className="md:w-full lg:w-full"
                            value={searchQuery!}
                            onChange={updateSearchQuery}
                        />

                        <SearchResults
                            results={documents!}
                            resultsLoading={isLoading}
                        />

                    </div>

                    <AlertDialogFooter>
                        <AlertDialogCancel>
                            Close Dialog
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    }

    return (
        <Sheet>
            <SheetTrigger className="w-full">
                <Searchbar disabled={false}/>
            </SheetTrigger>

            <SheetContent side="bottom" className="pb-10">
                <SheetHeader>
                    <SheetTitle>Search</SheetTitle>
                </SheetHeader>
                <div className="w-full py-3 min-h-[300px]">
                    <Searchbar 
                        className="md:w-full lg:w-full"
                        value={searchQuery!}
                        onChange={updateSearchQuery}
                    />

                    <SearchResults
                        results={documents!}
                        resultsLoading={isLoading}
                    />
                </div>
                <SheetFooter>
                    <SheetClose asChild>
                        <Button>Close</Button>
                    </SheetClose>
                </SheetFooter>



            </SheetContent>

        </Sheet>
    )
    
}

