import { prisma } from "@/prisma";
import createUser from "@/server/users/createUser";
import { type NextRequest } from "next/server"

interface User {
    email: string
    password?: string
    image: string

}

export default async function POST(req: NextRequest) {
    const userData = await req.json() as User;

    const { email } = userData;

    const newUser = await createUser(userData)

    return Response.json({
        data: newUser
    })
}