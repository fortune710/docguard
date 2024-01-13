import NextAuth, { User } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials"
import GoogleAuthProvider from "next-auth/providers/google";

import getUser from "@/server/users/getUser";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma";

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials, req) => {
                //Will Peform Validation of Password Here
                const user = await getUser(credentials?.email!)! as User;
                return user
            }
        }),
        GoogleAuthProvider({
            clientId: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!
        })
    ]
});

export { handler as GET, handler as POST }