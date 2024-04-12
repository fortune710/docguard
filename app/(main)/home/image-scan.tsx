'use client'
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useRef } from "react";
//import FileUploadDrawer from "./file-upload-drawer";

interface ImageScanProps {
    userId: string;
}

function ImageScan({ userId }: ImageScanProps) {
    
    const scanAsImage = async () => {
        const photo = await Camera.getPhoto({
            source: CameraSource.Camera,
            quality: 100,
            resultType: CameraResultType.DataUrl
        })
        console.log(photo.dataUrl)
    }
    
    return (
        <>
            <Button 
                onClick={scanAsImage}
                variant={"ghost"} 
                className="w-full rounded-lg"
            >
                Scan from Image
            </Button>

     
        </>
    )
}

export default ImageScan;