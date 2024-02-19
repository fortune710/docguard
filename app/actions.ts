'use server'

import getFile from "@/services/s3/getFile";
import createNewDocument from "@/server/documents/createNewDocument";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import uploadFile from "@/services/s3/uploadFile";

export const addNewDocumentAction = async (userId: string, formData: FormData) => {
    const file = formData.get("file") as File;
    const formEntries = formData.entries();
    const { title, description, expiry_date, category } = Object.fromEntries(formEntries);

    const expiryDate = !expiry_date ? null : new Date(expiry_date as any).toISOString();    
    //const url = await getFile(file.name);

    const fileBuffer = await file.arrayBuffer();

    
    await uploadFile(file.name!, fileBuffer)
    
    await createNewDocument({
        title: title.toString(),
        description: description.toString(),
        file_key: file.name,
        expiry_date: expiryDate,
        user_id: userId,
        category,
    })
    
    revalidatePath('/')
    redirect('/home')
}


