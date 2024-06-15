import getUserWithEmail from "@/server/users/getUserWithEmail";
import { type NextRequest } from "next/server"

interface User {
    email: string
}

export async function POST(req: NextRequest) {
    const userData = await req.json() as User;

    const existingUser = await getUserWithEmail(userData.email)
    if (!existingUser) {
    
        return Response.json({
            data: null, 
            message: "User with email does not exist"
        }, { status: 404 })
    }
    
    return Response.json({
        data: existingUser,
        message: "User with email found"
    })
}