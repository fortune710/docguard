import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "../ui/badge";
import { cache } from "react";
import findUsersRecentlyAdded from "@/server/documents/findUsersRecentlyAdded";
import { getUserFromSession } from "@/server/session";
import DocumentsTable from "./documents-table";
import { Button } from "../ui/button";
import FileUploadDrawer from "../home/file-upload-drawer";

export default async function RecentlyAddedDocuments() {
    const user = await getUserFromSession();
    
    const recentlyAdded = await findUsersRecentlyAdded(user?.id!)

    return (
        <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
                <CardTitle>Recently Added</CardTitle>
                <CardDescription>
                    Recent documents from your library.
                </CardDescription>
            </CardHeader>

            <CardContent>
                {
                    recentlyAdded.length < 1 ?
                    <div className="w-full flex flex-col items-center p-16 gap-3">
                        <p className="font-medium text-xl">You have not added any documents</p>
                        <FileUploadDrawer
                            uploadFileButton={
                                <Button>
                                    Create New Document
                                </Button>
                            }
                            userId={user?.id!}
                        />
                    </div>
                    :
                    <DocumentsTable documents={recentlyAdded}/>
                }
            </CardContent>
        </Card>
    )
}