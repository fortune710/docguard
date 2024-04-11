'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { useRef, useState } from "react";
import Image from "next/image";
import { generateRandomId } from "@/utils/functions";
import SubmitDocumentButton from "@/components/submit-document-button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useQueryParam, withDefault, StringParam } from "use-query-params";
import { addNewDocumentAction } from "../actions";
import CategorySelect from "../home/category-select";
import { useSearchParams } from "next/navigation";

interface ScanData {
    imageDataString: string;
    imageFile?: File
}

export default function ScanPage() {
    const [activeImage, setActiveImage] = useState<ScanData>({
        imageDataString: "",
        imageFile: undefined
    });

    const searchParams = useSearchParams();

    const scanAsImage = async () => {
        const photo = await Camera.getPhoto({
            source: CameraSource.Camera,
            quality: 100,
            allowEditing: true,
            resultType: CameraResultType.DataUrl
        })
        
        const parts = photo.dataUrl!.split(',');
        //const mime = parts[0].split(':')[1].split(';')[0];
        const data = parts[1];

        // Decode the base64 data
        const byteCharacters = atob(data);
        
        // Create a new ArrayBuffer and a new Uint8Array
        const arrayBuffer = new ArrayBuffer(byteCharacters.length);
        const uint8Array = new Uint8Array(arrayBuffer);

        // Loop over the data and populate the Uint8Array with the byte values
        for (let i = 0; i < byteCharacters.length; i++) {
            uint8Array[i] = byteCharacters.charCodeAt(i);
        }

        // Create a new Blob object from the ArrayBuffer
        const blob = new Blob([arrayBuffer], { type: 'image/png' });

        const fileName = generateRandomId(10);
        // Create a new File object from the Blob
        const file = new File([blob], `${fileName}.png`, { type: 'image/png' });
        const url = URL.createObjectURL(file);

        
        setActiveImage({
            imageDataString: photo.dataUrl!,
            imageFile: file
        })   
    }

    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    const [isCard] = useQueryParam('is_card', withDefault(StringParam, null, true))


    const addNewDocument = addNewDocumentAction.bind(null, searchParams.get('user_id')!);

    const handleFormAction = (formData: FormData) => {
        formData.append('file', activeImage.imageFile!);
        
        addNewDocument(formData)
        .then(() => {
            formRef?.current?.reset();

            toast({
                title: 'Upload Successful',
                description: 'Document was uploaded sucessfully',
            })
        })
        .catch(() => {
            toast({
                title: 'Error Occurred',
                description: 'Ran into an error while trying to upload',
                variant: 'destructive',
            })
        })
    }


    return (
        <main>
            <Button 
                onClick={scanAsImage}
                variant={"ghost"} 
                className="w-full rounded-lg"
            >
                Capture Image
            </Button>

            {
                !activeImage ? null :
            <img src={activeImage.imageDataString} alt="Image" width={50} height={50} />

            }

            <form ref={formRef} className="px-3 flex flex-col gap-2" action={handleFormAction}>
                    <div className="w-full">
                        <label htmlFor="title">Title</label>
                        <Input
                            placeholder="eg. Birth Certificate, School ID"
                            name="title"
                            className="mt-0.5"
                        />
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <Textarea
                            placeholder="Information about the document, like who it belongs to, etc"
                            name="description"
                            className="mt-0.5"
                        />
                    </div>

                    <div>
                        <label htmlFor="category">Category</label>
                        <CategorySelect/>
                    </div>

                    <div className="flex items-center gap-2">
                        <Input
                            name="is_card"
                            type="checkbox"
                            className="w-3 h-3"
                            checked={!!isCard}
                        />
                        <label htmlFor="is_card">If Document is a card, click this</label>
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

        </main>
    )
}