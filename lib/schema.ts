import { z } from "zod"

export const DocumentsSchema = z.object({
    title: z.string().trim().min(1, {
        message: "Title must be at least 1 character long"
    }),
    description: z.string().trim().nullish(),
    file_key: z.string().trim(),
    expiry_date: z.string().trim().datetime().nullish(),
    issue_date: z.string().trim().datetime().nullish(),
    user_id: z.string().trim().min(5, {
        message: "User Id not valid"
    }),
    is_card: z.boolean(),
    category: z.string().trim()
})