import { getServerSession } from "next-auth";
import findUsersDocuments from "@/server/documents/findUsersDocuments";
import getUser from "@/server/users/getUser";
import { FaChevronRight } from "react-icons/fa6";
import { Input } from "@/components/ui/input";
import CategoryDropdown from "./category-dropdown";
import BackButton from "@/components/back-button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DocumentLink } from "./document-link";
import findUsersDocumentCategory from "@/server/documents/findUserDocumentCategory";


export default async function DocumentsPage({ searchParams }: { searchParams: Record<'filter',string> }) {
    const session = await getServerSession();
    const user = await getUser(session?.user?.email!);
    const documents = (!searchParams.filter  || searchParams.filter === 'all') ? 
    await findUsersDocuments(user?.id!) : 
    await findUsersDocumentCategory(user?.id!, searchParams.filter);
    

    return (
        <main className="px-3 pt-6">
            <div className="flex items-center gap-2">
                <BackButton/>
                <CategoryDropdown/>
            </div>

            <p className="mt-3">Listed by Upload Date</p>

            <Input
                type="search"
                placeholder="Search for anything"
                className="mt-3"
            />

            <ul>
                {
                    documents.length === 0 ? <p>No documents</p>:
                    documents.map((document) => {
                        return (
                            <li key={document.id} className="py-3 border-b border-slate-300">
                                <Collapsible>
                                    <CollapsibleTrigger asChild>
                                        <button className="w-full text-left">
                                            <div className="flex font-semibold items-center justify-between">
                                                <p>{document.title}</p>
                                                <FaChevronRight />
                                            </div>
                                            <p>{document.description}</p>                                
                                        </button>
                                    </CollapsibleTrigger>

                                    <CollapsibleContent>
                                        <DocumentLink fileKey={document.file_key} />
                                    </CollapsibleContent>
                                </Collapsible>
                            </li>
                        )
                    })
                }

            </ul>

            
        </main>
    )
}