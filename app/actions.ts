'use server'

import createNewDocument from "@/server/documents/createNewDocument";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import uploadFile from "@/services/gcp-storage/uploadFile";

export const addNewDocumentAction = async (userId: string, formData: FormData) => {
    const file = formData.get("file") as File;
    const formEntries = formData.entries();
    const { title, description, expiry_date, category } = Object.fromEntries(formEntries);
    
    const expiryDate = !expiry_date ? null : new Date(expiry_date as any).toISOString();    


    const fileBuffer = await file.arrayBuffer();
    await uploadFile(fileBuffer, file.name)
    
    await createNewDocument({
        title: title.toString(),
        description: description.toString(),
        file_key: file.name,
        expiry_date: expiryDate,
        user_id: userId,
        category,
    })
    
    revalidatePath('/home')
    redirect('/home')
}
