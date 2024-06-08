

import { Client } from 'node-mailjet';

export const emailService = new Client({
    apiKey: process.env.MAILJET_KEY!,
    apiSecret: process.env.MAILJET_SECRET!
});


