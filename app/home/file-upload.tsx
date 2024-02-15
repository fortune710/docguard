
import getUser from "@/server/users/getUser";
import { getServerSession } from "next-auth";
import FileUploadDrawer from "./file-upload-drawer";





async function FileUpload() {
    const session = await getServerSession();
    const user = await getUser(session?.user?.email!);

    return (
        <FileUploadDrawer userId={user?.id!}/>
    )
}

export default FileUpload;