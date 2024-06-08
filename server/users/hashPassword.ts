import crypto from "crypto";

const hashPassword = (password: string) => {  
    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex')
    return hashedPassword
}

export default hashPassword;