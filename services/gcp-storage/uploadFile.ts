import { generateRandomId } from '@/utils/functions';
import storage from './storage.config';

const uploadFile = async (fileData: any, fileName: string) => {
    const fileKey = generateRandomId(10);
    const filePath = `documents/${fileKey}.png`
    await storage.bucket('docguard-bucket-v1').file(fileName).save(Buffer.from(fileData))
    //encrypt file later

    return filePath;
}

export default uploadFile;