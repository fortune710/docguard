import { SESClient } from "@aws-sdk/client-ses";

const ses = new SESClient({
    credentials: {
        accessKeyId: process.env.AWSACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
    region: 'us-east-1'
})

export default ses;