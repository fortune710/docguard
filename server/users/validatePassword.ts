import crypto from "crypto";

const validatePassword = (enteredPassword: string, storedPassword: string) => {
    //To generate the salt for hashing
    const salt = crypto.randomBytes(16).toString('hex'); 

    // Hashing user's salt and password with 1000 iterations, 
    const hashedPassword = crypto.pbkdf2Sync(enteredPassword, salt,  
    1000, 64, `sha512`).toString(`hex`); 

    return hashedPassword === storedPassword;
    
}