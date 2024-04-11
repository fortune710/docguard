import { Button } from "@/components/ui/button";
import { 
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerTitle,
    DrawerHeader, 
    DrawerDescription,
} from "@/components/ui/drawer"; 
import { TbLineScan } from "react-icons/tb";
import FileUpload from "./file-upload";
import getUser from "@/server/users/getUser";
import { getServerSession } from "next-auth";
import Link from "next/link";

const ScanButton = async () => {

    const session = await getServerSession();
    const user = await getUser(session?.user?.email!);




    return (
        <Drawer>
            <DrawerTrigger asChild>
                <Button variant={"ghost"}>
                    <TbLineScan/>
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Scan Document</DrawerTitle>
                    <DrawerDescription>
                        Select how you want to get this document
                    </DrawerDescription>
                </DrawerHeader>
                <div className="px-3 flex flex-col gap-4 mt-4 mb-10">
                    <Link href={`/scan?user_id=${user?.id}`}>
                        <Button 
                            variant={"ghost"} 
                            className="w-full rounded-lg"
                        >
                            Scan from Image
                        </Button>
                    </Link>

                    <FileUpload/>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default ScanButton;