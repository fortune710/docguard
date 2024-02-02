import { getServerSession } from "next-auth";
import findUsersDocuments from "@/server/documents/findUsersDocuments";

import {
    Drawer,
    DrawerClose,
    DrawerOverlay, 
    DrawerHeader,
    DrawerContent,
    DrawerTitle, 
    DrawerTrigger,
    DrawerDescription
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { addNewDocumentAction } from "../actions";
import SubmitDocumentButton from "@/components/submit-document-button";
import SignOutButton from "@/components/sign-out-btn";
import getUser from "@/server/users/getUser";

export default async function HomePage() {

    const session = await getServerSession();
    const user = await getUser(session?.user?.email!)
    const documents = await findUsersDocuments(user?.id!);

    const addNewDocument = addNewDocumentAction.bind(null, user?.id!)

    return (
        <main className="px-3">
            <div className="flex items-center w-full">
                <h1>Welcome Back, <br /> {session?.user?.name!}</h1>
            </div>

            {
                documents.length === 0 ? <p>No documents</p>:
                documents.map((document) => (
                    <div>
                        <p>{document.title}</p>
                        <p>{document.description}</p>
                    </div>
                ))
            }
            
            <SignOutButton/>

            <Drawer>
                <DrawerTrigger>
                    <Button>Upload New</Button>
                </DrawerTrigger>

                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Add New Document</DrawerTitle>
                    </DrawerHeader>

                    <form action={addNewDocument}>
                        <div className="w-full">
                            <label htmlFor="title">Title</label>
                            <Input
                                placeholder="eg. Birth Certificate, School ID"
                                name="title"
                            />
                        </div>

                        <div>
                            <label htmlFor="description">Description</label>
                            <Textarea
                                placeholder="Information about the document, like who it belongs to, etc"
                                name="description"
                            />
                        </div>

                        <div>
                            <label htmlFor="file">File</label>
                            <Input
                                placeholder="Upload File of Document"
                                name="file"
                                type="file"
                            />
                        </div>

                        <div>
                            <label htmlFor="expiry_date">Expiry Date</label>
                            <Input
                                placeholder="eg. Birth Certificate, School ID"
                                name="expiry_date"
                                type="date"
                            />
                        </div>
                        <SubmitDocumentButton/>

                    </form>
                </DrawerContent>
            </Drawer>

        </main>
    )
}
