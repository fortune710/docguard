import { SESClient } from "@aws-sdk/client-ses";

const ses = new SESClient({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
    }
})

export default ses;