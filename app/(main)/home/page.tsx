//import SignOutButton from "@/components/sign-out-btn";
import { Settings } from "lucide-react";
import Link from "next/link";
import HomePageLayout from "@/components/home/home-page-layout";
import { getUserFromSession } from "@/server/session";


export default async function HomePage() {
    const user = await getUserFromSession();


    return (
        <main className="px-3">
            <div className="flex items-center justify-between w-full">
                <div className="my-2 md:my-4">
                    <h4 className="font-medium text-xl">Welcome Back</h4>
                    <h1 className="font-semibold text-3xl">{user?.name!}</h1>
                </div>

                <Link className="md:hidden" href="/settings">
                    <Settings/>
                </Link>
            </div>

            <HomePageLayout/>

        </main>
    )
}
