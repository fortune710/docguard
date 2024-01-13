import { PutObjectCommand } from "@aws-sdk/client-s3";
import { createReadStream } from "fs";
import s3 from "./s3.config";



const uploadFile = async (fileName: string) => {
    try {
        const result = await s3.send(
            new PutObjectCommand({
                Bucket: process.env.AWS_BUCKET_NAME!,
                Key: fileName,
                Body: createReadStream(fileName)
            })
        )
        return result
    } catch {
        throw Error("Could not upload document to S3")
    }
}

export default uploadFile;

