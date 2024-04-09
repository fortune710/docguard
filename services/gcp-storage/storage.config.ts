import { Storage } from "@google-cloud/storage";
import credentials from '../../docguard-service-key.json'
const storage = new Storage({
    keyFile: '../../docguard-service-key.json',
    
    
})

export default storage;