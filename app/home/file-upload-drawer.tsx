'use client'

import {
    Drawer,
    DrawerClose,
    DrawerOverlay,
    DrawerHeader,
    DrawerContent,
    DrawerTitle, 
    DrawerTrigger,
    DrawerDescription
} from "@/components/ui/drawer";
import CategorySelect from "./category-select";
import SubmitDocumentButton from "@/components/submit-document-button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { addNewDocumentAction } from "../actions";
import { useRef, useState } from "react";


interface FileUploadDrawerProps {
    userId: string
}

export default function FileUploadDrawer({ userId }: FileUploadDrawerProps) {
    const [drawerOpen, setDrawer] = useState(false);    
    const formRef = useRef<HTMLFormElement>(null);

    const addNewDocument = addNewDocumentAction.bind(null, userId);

    const handleFormAction = (formData: FormData) => {
        addNewDocument(formData);
        setDrawer(false);
        formRef?.current?.reset();
    }
    
    return (
        <Drawer 
            open={drawerOpen} 
            onOpenChange={(isOpen) => setDrawer(isOpen)}
            onClose={() => setDrawer(false)}
        >
            <DrawerTrigger asChild>
                <Button className="w-full rounded-lg">
                    Scan from File
                </Button>
            </DrawerTrigger>

            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle>Add New Document</DrawerTitle>
                </DrawerHeader>

                <form ref={formRef} className="px-3" action={handleFormAction}>
                    <div className="w-full">
                        <label htmlFor="title">Title</label>
                        <Input
                            placeholder="eg. Birth Certificate, School ID"
                            name="title"
                        />
                    </div>

                    <div>
                        <label htmlFor="description">Description</label>
                        <Textarea
                            placeholder="Information about the document, like who it belongs to, etc"
                            name="description"
                        />
                    </div>

                    <div>
                        <label htmlFor="file">File</label>
                        <Input
                            placeholder="Upload File of Document"
                            name="file"
                            type="file"
                        />
                    </div>

                    <div>
                        <label htmlFor="category">Category</label>
                        <CategorySelect/>
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
            </DrawerContent>
        </Drawer>
    )
}