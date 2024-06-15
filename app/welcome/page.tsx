import { AuroraBackground } from "@/components/aurora-background";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function WelcomePage() {
    return (
        <AuroraBackground className="w-screen h-[100dvh] flex items-center justify-center">
            <div className="space-y-7 grid place-content-center">
                <div className="space-y-3">
                    <h3 className="text-5xl font-semibold font-ppmori animate-text-focus-in">Welcome To DocGuard</h3>
                    <p className="text-2xl font-medium font-ppmori text-center animate-text-focus-in">Your new digital pass</p>
                </div>
                <Link className="mx-auto cursor-pointer z-20" href="/home">
                    <Button className="w-full">
                        Go to your Dashboard
                    </Button>
                </Link>
            </div>
        </AuroraBackground>
    )
}