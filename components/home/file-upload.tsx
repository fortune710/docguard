
import getUser from "@/server/users/getUser";
import { getServerSession } from "next-auth";
import FileUploadDrawer from "./file-upload-drawer";
import UploadNewFile from "../../app/(main)/home/upload-file-button";





async function FileUpload() {
    const session = await getServerSession();
    const user = await getUser(session?.user?.email!);

    return (
        <FileUploadDrawer 
            userId={user?.id!}
            uploadFileButton={
                <UploadNewFile/>
            }    
        />
    )
}

export default FileUpload;