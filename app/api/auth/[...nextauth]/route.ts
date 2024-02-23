import NextAuth, { Session, User } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials"
import GoogleAuthProvider from "next-auth/providers/google";

import getUser from "@/server/users/getUser";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma";

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    secret: process.env.NEXTAUTH_SECRET!,
    session: {
        strategy: "jwt"
    },
    pages: {
        signIn: "/login",
        error: "/login"
    },
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            type: "credentials",
            credentials: {
                email: {},
                password: {}
            },
            authorize: async (credentials, req) => {
                //Will Peform Validation of Password Here
                const user = await getUser(credentials?.email!)! as User;
                if (!user) return null
                return user
            },
            
        }),
        GoogleAuthProvider({
            id: "google",
            name: "google",
            clientId: process.env.CLIENT_ID!,
            clientSecret: process.env.CLIENT_SECRET!,
        })
    ],
    callbacks: {
        redirect: ({ url, baseUrl }) => { return url }, 
        jwt: async ({ user, token }) => {
            if (user) {
                return {
                    ...token,
                    id: user.id
                }
            }
            return token
        },
        session: async ({ token, session }) => {
            
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id
                }
            }
        },
        signIn: async ({ user }) => {
            return true
        }
    },
});

export { handler as GET, handler as POST }