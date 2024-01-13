import AuthForm from "@/components/auth-form";
import { Metadata } from "next";
import Image from "next/image"
import Link from "next/link";

export const metadata: Metadata = {
    title: "Sign Up to DocGuard"
}

export default function SignUpPage() {
    return (
        <main className="px-3 mt-7">
            <div className="flex flex-col items-center gap-1.5 my-4">
                <Image
                    src={"/docguard.png"}
                    alt="DocGuard Logo"
                    width={250}
                    height={120}
                    className="mx-auto"
                />
                <h1 className="text-3xl font-semibold">
                    Welcome to DocGuard
                </h1>
                <p>Please enter you details to sign up</p>
            </div>
            <section className="flex flex-col gap-6 my-4">
                <AuthForm type="sign-up"/>

                <p className="text-center">
                    By creating an account, you agree to our <Link href="/terms">Terms of Service </Link> 
                    and <Link href="/privacy-policy">Privacy Policy</Link>
                </p>
                <div className="flex items-center justify-center gap-0.5 font-medium">
                    <p>Already have an account?</p>
                    <Link href="/login">Login</Link>
                </div>
            </section>
        </main>
    )
}