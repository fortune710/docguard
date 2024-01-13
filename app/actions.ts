'use server'

import uploadFile from "@/services/s3/uploadFile";
import getFile from "@/services/s3/getFile";
import createNewDocument from "@/server/documents/createNewDocument";
import { prisma } from "@/prisma";

import { revalidatePath } from "next/cache";

export const addNewDocumentAction = async (formData: FormData) => {
    const file = formData.get("file") as File;
    const formEntries = formData.entries();
    const { title, description, expiry_date, user_id } = Object.fromEntries(formEntries);

    await uploadFile(file.name)
    const url = await getFile(file.name);

    await createNewDocument({
        title: title.toString(),
        description: description.toString(),
        url,
        expiry_date: expiry_date.toString(),
        user_id: user_id.toString()
    })
    
    revalidatePath('/')
}


