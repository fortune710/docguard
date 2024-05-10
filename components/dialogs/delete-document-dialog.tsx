"use client"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import deleteDocument from "@/server/documents/deleteDcoument";
import { revalidatePath } from "next/cache";
import React, { useState } from "react";
import { deleteUserDocument } from "@/app/actions";

interface DeleteDocumentDialogProps {
    documentId: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DeleteDocumentDialog({ documentId, open, onOpenChange }: DeleteDocumentDialogProps) {

    const deleteDocument = deleteUserDocument.bind(null, documentId)
    
    return (
        <AlertDialog 
            onOpenChange={onOpenChange} 
            open={open}
        >

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Document</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this document? This cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <form className="space-x-3" action={deleteDocument}>
                        <AlertDialogCancel type="button">
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction type="submit">
                            Confirm
                        </AlertDialogAction>
                    </form>
                </AlertDialogFooter>
            </AlertDialogContent>
        
        </AlertDialog>
    )
}