'use client'

import { addNewDocumentAction, addNewCard } from "@/app/actions";
import { useRef, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useQueryParam, withDefault, StringParam } from "use-query-params";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useCardCapture from "@/hooks/useCardCapture";
import { Input } from "../ui/input";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer";
import CategorySelect from "@/app/(main)/home/category-select";
import UploadCardSide from "../card/upload-card-side";
import SubmitDocumentButton from "../submit-document-button";
import { Textarea } from "@/components/ui/textarea";

interface FileUploadDrawerProps {
    userId: string,
    uploadFileButton?: React.ReactNode
}

export default function FileUploadDrawer({ userId, uploadFileButton }: FileUploadDrawerProps) {
    const [drawerOpen, setDrawer] = useState(false);    
    const formRef = useRef<HTMLFormElement>(null);
    const { toast } = useToast();
    const [isCard, setIsCard] = useQueryParam('is_card', withDefault(StringParam, null, true))
    const { cardFront, cardBack, updateCardFront, updateCardBack } = useCardCapture();
    const isMobile = useMediaQuery('(max-width: 640px)');

    const addNewDocument = addNewDocumentAction.bind(null, userId);

    const handleFormAction = async (formData: FormData) => {
        try {
            formData.append("is_card", isCard || "")
            const documentId = await addNewDocument(formData)
            
            if(isCard === 'true') {
                const formData = new FormData();
                formData.append("card_front", cardFront.actualImageFile!)
                formData.append("card_back", cardBack.actualImageFile!)
                formData.append("document_id", documentId)

                await addNewCard(formData)
            }
            setDrawer(false);
            formRef?.current?.reset();

            updateCardBack({ imageDataString: "", actualImageFile: null })
            updateCardFront({ imageDataString: "", actualImageFile: null })
    
            toast({
                title: 'Upload Successful',
                description: 'Document was uploaded sucessfully',
            })

        } catch {
            toast({
                title: 'Error Occurred',
                description: 'Ran into an error while trying to upload',
                variant: 'destructive',
            })

        }
    }

    const drawerClose = () => {
        setIsCard(null)
        setDrawer(false)
    }
    
    return (
        <>
            {
                !isMobile ? 
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        { uploadFileButton }
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>New Document</AlertDialogTitle>
                            <AlertDialogDescription>
                                Upload a New Document
                            </AlertDialogDescription>
                        </AlertDialogHeader>


                        <form 
                            ref={formRef} 
                            action={handleFormAction}
                        >
                            <div className="flex flex-col px-3 gap-2 max-h-[400px] overflow-y-scroll my-4">
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

                                {
                                    !isCard ? 
                                    <div>
                                        <label htmlFor="file">File</label>
                                        <Input
                                            placeholder="Upload File of Document"
                                            name="file"
                                            type="file"
                                            className="mt-0.5"
                                        />
                                    </div> : 
                                    <>
                                        <div className="flex flex-col">
                                            <label>Card Front</label>
                                            <UploadCardSide 
                                                uploaded={!!cardFront.imageDataString}
                                                setCardSideData={updateCardFront}
                                                cardSide="front"
                                            />
                                        </div>

                                        <div className="flex flex-col">
                                            <label>Card Back</label>
                                            <UploadCardSide 
                                                setCardSideData={updateCardBack}
                                                uploaded={!!cardBack.imageDataString}
                                                cardSide="back"
                                            />
                                        </div>
                                                                            
                                    </>
                                }

                                <div className="flex items-center gap-2">
                                    <Input
                                        name="is_card"
                                        type="checkbox"
                                        disabled={!!isCard}
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
                            </div>

                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <SubmitDocumentButton/>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogContent>
                </AlertDialog>
                :
                <Drawer 
                    open={drawerOpen} 
                    onOpenChange={(isOpen) => setDrawer(isOpen)}
                    onClose={drawerClose}
                >
                    <DrawerTrigger asChild>
                        { uploadFileButton }
                    </DrawerTrigger>
                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>Add New Document</DrawerTitle>
                        </DrawerHeader>

                        <form className="px-3" ref={formRef} action={handleFormAction}>

                            <div className="flex flex-col gap-2 max-h-[400px] overflow-scroll">
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


                                {
                                    !isCard ? 
                                    <div>
                                        <label htmlFor="file">File</label>
                                        <Input
                                            placeholder="Upload File of Document"
                                            name="file"
                                            type="file"
                                            className="mt-0.5"
                                        />
                                    </div> : 
                                    <>
                                        <div className="flex flex-col">
                                            <label>Card Front</label>
                                            <UploadCardSide 
                                                uploaded={!!cardFront.imageDataString}
                                                setCardSideData={updateCardFront}
                                                cardSide="front"
                                            />
                                        </div>

                                        <div className="flex flex-col">
                                            <label>Card Back</label>
                                            <UploadCardSide 
                                                setCardSideData={updateCardBack}
                                                uploaded={!!cardBack.imageDataString}
                                                cardSide="back"
                                            />
                                        </div>
                                                                            
                                    </>
                                }


                                <div>
                                    <label htmlFor="expiry_date">Expiry Date</label>
                                    <Input
                                        placeholder="eg. Birth Certificate, School ID"
                                        name="expiry_date"
                                        type="date"
                                    />
                                </div>
                            </div>
                            <SubmitDocumentButton/>

                        </form>
                    </DrawerContent>
                </Drawer>

            }
        
        </>
    )
}