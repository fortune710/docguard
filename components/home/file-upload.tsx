
import getUser from "@/server/users/getUser";
import { getServerSession } from "next-auth";
import FileUploadDrawer from "./file-upload-drawer";
import { Button } from "@/components/ui/button";





async function FileUpload() {
    const session = await getServerSession();
    const user = await getUser(session?.user?.email!);

    return (
        <FileUploadDrawer 
            userId={user?.id!}
            uploadFileButton={
                <Button className="max-md:w-full rounded-lg">
                    Scan from File
                </Button>    
            }    
        />
    )
}

export default FileUpload;