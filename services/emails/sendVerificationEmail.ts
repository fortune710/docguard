import { sendEmail } from "./sendEmail"

export const sendVerificationEmail = async (userEmail: string, code: string) => {
    const template = `
        Hello there, This is Fortune Alebiosu and thank you for singing up on DocGuard. \n\n
        This is just a little verification to ensure your email is valid.\n
        Verificaion Code: ${code} \n\n

        This code expires after 10 minutes.
    `
    
    return await sendEmail(template, "DocGuard Email Verification", [userEmail])
} 