import AuthForm from "@/components/auth-form";
import Image from "next/image"
import Link from "next/link";

export default function LoginPage() {
    return (
        <main className="px-3 mt-5 md:mx-auto md:mt-7 lg:mt-10 md:w-2/3 lg:w-1/3">
            <div className="flex flex-col items-center gap-1 my-4">
                <Image
                    src={"/docguard.png"}
                    alt="DocGuard Logo"
                    width={250}
                    height={120}
                    className="mx-auto"
                />
                <h1 className="text-3xl font-semibold">Welcome Back</h1>
                <p>Please enter you details</p>
            </div>
            <section className="flex flex-col gap-6 my-4">
                <AuthForm type="login"/>

                <div className="flex items-center justify-center gap-0.5 font-medium">
                    <p>Don&apos;t have an account?</p>{" "}
                    <Link className="hover:text-blue-900" href="/register">Sign Up</Link>
                </div>
            </section>
        </main>
    )
}