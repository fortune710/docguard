import { emailService } from "./mail.config"
import { SendEmailV3_1, LibraryResponse } from 'node-mailjet';

export const sendEmail = async (template: string, subject: string, recipients: string[]) => {
    const toEmails = recipients.map((email) => ({ Email: email }))
    
    const data: SendEmailV3_1.Body = {
        Messages: [
          {
            From: {
              Email: 'docguard@fortunethedev.co',
              Name: "Fortune Alebiosu"
            },
            To: toEmails,
            Subject: subject,
            TextPart: template
          },
        ],
    }

    const result: LibraryResponse<SendEmailV3_1.Response> = await emailService
          .post('send', { version: 'v3.1' })
          .request(data);
    return result
}