import useDebounce from "@/hooks/useDebounce"
import { ChangeEvent, useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Documents } from "@/server/types"
import { SearchQuerySchema } from "@/lib/schema"


export default function useSearch(userId: string) {
    const [searchQuery, setSearchQuery] = useState('');
    const debouncedQuery = useDebounce(searchQuery!);

    const updateSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
        return setSearchQuery(e.target.value)
    }

    const { isLoading, data: documents } = useQuery({
        queryKey: ['search', debouncedQuery],
        queryFn: async () => {
            const { user_id, query } = SearchQuerySchema.parse({ user_id: userId, query: debouncedQuery })
            
            const response = await fetch(`/api/search/documents?user_id=${user_id}&query=${query}`)
            const docs = await response.json() as { data: Documents };
            return docs.data
        }
    })

    return {
        isLoading,
        documents,
        updateSearchQuery,
        searchQuery
    }

}