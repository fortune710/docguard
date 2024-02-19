'use server'

import { GetObjectCommand } from "@aws-sdk/client-s3";
import s3 from "./s3.config";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const getFile = async (fileName: string) => {
    try {
        const result = new GetObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: fileName,
        })

        const docUrl = await getSignedUrl(s3, result)
        return docUrl
    } catch (e) {
        throw Error("Could not get object from s3")
    }
}

export default getFile;