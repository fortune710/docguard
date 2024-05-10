'use server'

import createNewDocument from "@/server/documents/createNewDocument";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import uploadFile from "@/services/gcp-storage/uploadFile";
import { ImageUploadData } from "@/types";
import createNewCard from "@/server/card/createNewCard";
import updateDocument from "@/server/documents/updateDocument";
import deleteDocument from "@/server/documents/deleteDcoument";

export const addNewDocumentAction = async (userId: string, formData: FormData) => {
    const file = formData.get("file") as File;
    const formEntries = formData.entries();
    const { title, description, expiry_date, category, is_card } = Object.fromEntries(formEntries);
    
    const expiryDate = !expiry_date ? null : new Date(expiry_date as any).toISOString();    


    const fileBuffer = await file?.arrayBuffer()!;
    const fileKey = !fileBuffer ? "" :  await uploadFile(fileBuffer)
    const newDocument = await createNewDocument({
        title: title.toString(),
        description: description.toString(),
        file_key: fileKey,
        expiry_date: expiryDate,
        user_id: userId,
        is_card: !!is_card?.toString() || false,
        category,
    })

    /*
    if (!!!is_card.toString()) {
        revalidatePath('/home')
        redirect('/home')
    }*/
    revalidatePath('/home')

    return newDocument.id

}

interface AddNewCardAction {
    cardFront: ImageUploadData,
    cardBack: ImageUploadData,
    documentId: string,
}

export const addNewCard = async (formData: FormData) => {
    const cardFront = formData.get("card_front") as File;
    const cardBack = formData.get("card_back") as File|string;
    const documentId = formData.get("document_id")?.toString()!

    const cardFrontBuffer = await cardFront?.arrayBuffer();
    const cardBackBuffer = cardBack === 'null' ? '' : await (cardBack as File)?.arrayBuffer();


    const [frontKey, backKey] = await Promise.all([
        await uploadFile(cardFrontBuffer, 'cards'),
        await uploadFile(cardBackBuffer, "cards")
    ])


    await Promise.all([
        await updateDocument(documentId, { file_key: frontKey }),
        await createNewCard({
            card_front: frontKey,
            card_back: backKey,
            document_id: documentId,
        })
    ])

    revalidatePath('/home')

}

export const deleteUserDocument = async (documentId: string, formData: FormData) => {
    console.log(documentId)
    const doc = await deleteDocument(documentId)
    revalidatePath('/home')
    revalidatePath('/documents')
}
