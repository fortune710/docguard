import crypto from "crypto";

const validatePassword = (enteredPassword: string, storedPassword: string) => {
    const hashedPassword = crypto.createHash('sha256').update(enteredPassword).digest('hex') 
    return hashedPassword === storedPassword;
    
}

export { validatePassword }