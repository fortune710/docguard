'use client'

import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { Button } from "./ui/button";
import { captureImage } from "@/utils/functions";
import { ImageUploadData } from "@/types";
import { CameraSource } from "@capacitor/camera";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";

interface CamerPromptProps {
    children: React.ReactNode,
    updateImage: (imageData: ImageUploadData) => any,
}

export default function CameraPrompt({ children, updateImage }: CamerPromptProps) {

    const isMobile = useMediaQuery('(max-width: 640px)');


    const handleImageUpdate = async (cameraSource: CameraSource) => {
        const photo = await captureImage(cameraSource);
        return updateImage({ 
            imageDataString: photo.imageDataString, 
            actualImageFile: photo.actualFile 
        })
    }

    return (
        <>
            {
                !isMobile ? 
                <AlertDialog>
                    <AlertDialogTrigger>
                        { children }
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Take Picture</AlertDialogTitle>
                        </AlertDialogHeader>

                        <div>
                            <Button 
                                variant="ghost" 
                                onClick={() => handleImageUpdate(CameraSource.Camera)}
                            >
                                From Camera
                            </Button>
                            <Button
                                variant="ghost" 
                                onClick={() => handleImageUpdate(CameraSource.Photos)}                                                            
                            >
                                From Gallery
                            </Button>
                        </div>
                    </AlertDialogContent>
                </AlertDialog>
                
                :

                <Drawer>
                    <DrawerTrigger>
                        { children }
                    </DrawerTrigger>

                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Take Picture</DrawerTitle>
                        </DrawerHeader>

                        <div>
                            <Button 
                                variant="ghost" 
                                onClick={() => handleImageUpdate(CameraSource.Camera)}
                            >
                                From Camera
                            </Button>
                            <Button
                                variant="ghost" 
                                onClick={() => handleImageUpdate(CameraSource.Photos)}                                                            
                            >
                                From Gallery
                            </Button>
                        </div>
                    </DrawerContent>
                </Drawer>
            }
        
        </>

    )
}