import NextAuth, { Session, User } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials"
import GoogleAuthProvider from "next-auth/providers/google";

import getUser from "@/server/users/getUser";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/prisma";
import getUserWithEmail from "@/server/users/getUserWithEmail";
import { createVerification } from "@/server/verification/createVerification";
import { sendVerificationEmail } from "@/services/emails/sendVerificationEmail";
import { generateOTP } from "@/utils/functions";
import updateUser from "@/server/users/updateUser";

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
        redirect: ({ url }) => { return url }, 
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
        signIn: async ({ user, profile }) => {
            const fullUser = await getUserWithEmail(user?.email!);
            
            if (!profile) { //This means user used credentials to sign in
                const otp = generateOTP();
                if (!fullUser?.password) {
                    await sendVerificationEmail(fullUser?.email!, otp)
                    return `/login?unauthorized=true&email=${user?.email}&reset=true`
                }
                
                if (!fullUser?.emailVerified) {
                    
                    await Promise.all([
                        await createVerification(fullUser?.id!, otp),
                        await sendVerificationEmail(fullUser?.email!, otp)
                    ])           
                    return `/login?unauthorized=true&email=${user?.email!}`
                }
            }

            if (!fullUser?.emailVerified) {
                await updateUser({ emailVerified: new Date(Date.now()) }, profile?.email!)    
            }
            
            
            return true
        }
    },
});

export { handler as GET, handler as POST }