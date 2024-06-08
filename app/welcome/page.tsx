import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function WelcomePage() {
    return (
        <main className="w-screen h-[100dvh] flex items-center justify-center">
            <div className="space-y-5 grid place-content-center">
                <h3 className="text-5xl font-semibold font-ppmori animate-text-focus-in">Welcome To DocGuard</h3>

                <p className="text-2xl font-medium font-ppmori text-center animate-text-focus-in">Your new digital pass</p>
                    <Link href="/home">
                        <Button className="mx-auto">
                            Go to your Dashboard
                        </Button>
                    </Link>
            </div>
        </main>
    )
}