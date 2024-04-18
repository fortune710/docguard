import storage from "./storage.config";

const getFile = async (path: string) => {
    if (!path) return ""
    
    const url = await storage.bucket('docguard-bucket-v1').file(path).getSignedUrl({
        action: 'read',
        expires: Date.now() + 5 * 60 * 1000,
    });
    return url[0]
}

export default getFile;