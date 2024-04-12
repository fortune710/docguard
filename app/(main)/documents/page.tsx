import { getServerSession } from "next-auth";
import findUsersDocuments from "@/server/documents/findUsersDocuments";
import getUser from "@/server/users/getUser";
import { Input } from "@/components/ui/input";
import CategoryDropdown from "./category-dropdown";
import BackButton from "@/components/back-button";
import findUsersDocumentCategory from "@/server/documents/findUserDocumentCategory";
import DocumentsLayout from "./documents-layout";


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

            <p className="mt-3 md:hidden">Listed by Upload Date</p>

            <Input
                type="search"
                placeholder="Search for anything"
                className="mt-3 md:hidden"
            />
            <DocumentsLayout documents={documents} /> 
            
        </main>
    )
}