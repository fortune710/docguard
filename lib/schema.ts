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

export const SearchQuerySchema = z.object({
    user_id: z.string({
        required_error: "Cannot find user identifier"
    }).trim().min(5, {
        message: "User Id not valid"
    }),
    query: z.string({
        required_error: "Search query not present"
    }).trim()
})

export const emailSchema = z.string({
    required_error: "Email is required and cannot be blank",
}).trim().min(3).email({
    message: "Email field is not a valid email"
})

export const passwordSchema = z.string({
    required_error: "Password is required and cannot be blank"
}).trim().min(5, {
    message: "Password must be at least 5 characters"
})

export const nameSchema = z.string({
    required_error: "Name is required and cannot be blank"
}).trim().min(1, {
    message: "Name must be at least 1 character"
})