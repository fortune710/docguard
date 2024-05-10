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
import { addNewDocumentAction } from "@/app/actions";
import CategorySelect from "../home/category-select";
import { useSearchParams } from "next/navigation";

interface ScanData {
    imageDataString: string;
    imageFile?: File
}

const defaultImageState: ScanData = {
    imageDataString: "",
    imageFile: undefined
}

export default function ScanPage() {
    const [activeImage, setActiveImage] = useState<ScanData>(defaultImageState);

    const searchParams = useSearchParams();

    const scanAsImage = async () => {
        const photo = await Camera.getPhoto({
            source: CameraSource.Camera,
            quality: 100,
            allowEditing: true,
            resultType: CameraResultType.DataUrl
        })
        
        const parts = photo.dataUrl!.split(',');
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

        
        setActiveImage({
            imageDataString: photo.dataUrl!,
            imageFile: file
        })   
    }

    const removeImage = () => {
        return setActiveImage(defaultImageState)
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
            setActiveImage(defaultImageState)

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
            <form 
                ref={formRef}
                className="px-3 flex flex-col gap-2 w-2/3 ml-6 pt-5" 
                action={handleFormAction}
            >
                <>
                    {
                        !activeImage.imageFile ? (
                            <div>
                                <label htmlFor="title">Document Image</label>
                                <button onClick={scanAsImage} type="button" className="mt-2 w-3/5 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-300" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                                            <path fill-rule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clip-rule="evenodd" />
                                        </svg>
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500">
                                                <span>Click to capture</span>
                                            </label>
                                            <p className="pl-1">or drag and drop (coming soon)</p>
                                        </div>
                                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </button>
                            </div>
                        ):
                        <div className="flex items-center gap-3">
                            <Image 
                                src={activeImage.imageDataString} 
                                alt="Image" 
                                width={200} height={200} 
                                className="rounded-xl"
                            />
                            <Button 
                                onClick={removeImage}
                                type="button"
                                variant="destructive"
                                className="w-1/4 rounded-lg"
                            >
                                Remove
                            </Button>
                        </div>
                    }
                </>


                <div className="w-4/5">
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

                <div className="mt-5 w-full">
                    <SubmitDocumentButton/>
                </div>

            </form>

        </main>
    )
}