import { Button } from "@/components/ui/button";
import { 
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerTitle,
    DrawerHeader, 
    DrawerDescription,
    DrawerClose
} from "@/components/ui/drawer"; 
import { TbLineScan } from "react-icons/tb";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useRef } from "react";
import FileUpload from "./file-upload";

const ScanButton = () => {

    //const drawerRef = useRef<typeof DrawerTrigger>(null);

    const scanAsImage = async () => {
        return await Camera.getPhoto({
            source: CameraSource.Prompt,
            quality: 100,
            resultType: CameraResultType.DataUrl
        })
    }


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
                    <Button variant={"ghost"} className="w-full rounded-lg">
                        Scan from Image
                    </Button>
                    <FileUpload/>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default ScanButton;