import { generateRandomId } from '@/utils/functions';
import storage from './storage.config';

const uploadFile = async (
    fileData: any, 
    bucketFolderName: string = 'documents'
) => {
    if (!fileData) return "";
    
    const fileKey = generateRandomId(10);
    const filePath = `${bucketFolderName}/${fileKey}.png`
    await storage.bucket('docguard-bucket-v1').file(filePath).save(Buffer.from(fileData))
    //encrypt file later

    return filePath; //This will be stored in DB
}

export default uploadFile;