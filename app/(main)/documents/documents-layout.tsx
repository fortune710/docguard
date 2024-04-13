

import { Documents } from "@/server/types"
import DocumentsTable from "./documents-table"

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DocumentLink } from "@/components/documents/document-link";
import { FaChevronRight } from "react-icons/fa6";


interface DocumentsLayoutProps {
    documents: Documents
}


export default function DocumentsLayout({ documents }: DocumentsLayoutProps) {
    //const isMobile = useMediaQuery('(max-width: 640px)');

    return (
        <>
            <section className="max-sm:hidden">
                <DocumentsTable documents={documents} /> 
            </section>
            <section className="md:hidden">
                <DocumentsList documents={documents} />
            </section>
        </>
    )
}


function DocumentsList({ documents }: DocumentsLayoutProps) {
    return (
        <ul>
            {
                documents.length === 0 ? <p>No documents</p>:
                documents.map((document) => (
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
                ))
            }

        </ul>

    )
}