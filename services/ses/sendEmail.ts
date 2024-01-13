import { SendEmailCommand } from "@aws-sdk/client-ses"
import ses from "./ses.config"

const sendEmail = async (recipientEmails: string[], subject: string, body: string, bodyIsHtml: boolean = false) => {
    return ses.send(
        new SendEmailCommand({
            Source: "Fortune Alebiosu <fortunealebiosu710@gmail.com>",
            Destination: {
                ToAddresses: recipientEmails
            },
            Message: {
                Body:  {
                    Text: !bodyIsHtml ? { Data: body } : undefined,
                    Html: bodyIsHtml ? { Data: body } : undefined
                },
                Subject: {
                    Data: subject
                }
            }
        })
    )
}

export default sendEmail;