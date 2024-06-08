import crypto from "crypto";

const hashPassword = (password: string) => {
    //To generate the salt for hashing
    const salt = crypto.randomBytes(16).toString('hex'); 
  
    // Hashing user's salt and password with 1000 iterations, 
    const hashedPassword = crypto.pbkdf2Sync(password, salt,  
    1000, 64, `sha512`).toString(`hex`); 
    return hashedPassword
}

export default hashPassword;