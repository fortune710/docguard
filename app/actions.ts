'use server'

import getFile from "@/services/s3/getFile";
import createNewDocument from "@/server/documents/createNewDocument";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addNewDocumentAction = async (userId: string, formData: FormData) => {
    const file = formData.get("file") as File;
    const formEntries = formData.entries();
    const { title, description, expiry_date, category } = Object.fromEntries(formEntries);

    const url = await getFile(file.name);

    
    await createNewDocument({
        title: title.toString(),
        description: description.toString(),
        url,
        expiry_date: new Date(expiry_date as any).toISOString() || null,
        user_id: userId,
        category
    })
    
    revalidatePath('/')
    redirect('/home')
}


