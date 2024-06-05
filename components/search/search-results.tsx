import { Documents } from "@/server/types"
import { File } from "lucide-react"
import SearchActions from "./search-actions"

interface SearchResultsProps {
    resultsLoading: boolean,
    results: Documents
}

const SearchResults = ({ results, resultsLoading }: SearchResultsProps) => {
    return (
        <ul className="my-5 space-y-1.5">
            {
                resultsLoading ? 
                <>
                    <li className="mb-3 animate-pulse bg-zinc-200 rounded-md h-12 w-full"/> 
                    <li className="animate-pulse bg-zinc-200 rounded-md h-12 w-full"/> 
                </> :
                results?.map((document) => (
                    <li className="grid grid-cols-[30px_auto_30px] items-center gap-3 text-sm font-medium font-inter hover:bg-zinc-200 rounded-md py-2.5 px-3 w-full" key={document.id}>
                        <File className="h-6 w-6"/>
                        <div>
                            <p className="text-2xs capitalize">{document.category}</p>
                            <p>{document.title}</p>
                            <p className="text-xs">{document.description?.substring(0, 50)}</p>
                        </div>
                        <SearchActions
                            documentKey={document.file_key || ""}
                            documentTitle={document.title}
                        />
                    </li>
                ))
            }
        </ul>
    )
}

export default SearchResults;