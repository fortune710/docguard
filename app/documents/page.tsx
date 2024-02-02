import { getServerSession } from "next-auth";
import findUsersDocuments from "@/server/documents/findUsersDocuments";
import getUser from "@/server/users/getUser";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export default async function DocumentsPage() {
    const session = await getServerSession();
    const user = await getUser(session?.user?.email!);
    const documents = await findUsersDocuments(user?.id!);

    return (
        <main className="px-3">
            <div className="flex items-center gap-2">
                <Button variant={"ghost"} className="border border-slate-300 rounded-lg aspect-square">
                    <FaChevronLeft/>
                </Button>
                <h1>Documents</h1>
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
                    documents.map((document) => (
                        <li className="py-3 border-b border-slate-300">
                            <div className="flex font-semibold items-center justify-between">
                                <p>{document.title}</p>
                                <FaChevronRight />
                            </div>
                            <p>{document.description}</p>
                        </li>
                    ))
                }

            </ul>

            
        </main>
    )
}