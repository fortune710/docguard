import { getServerSession } from "next-auth";

import SignOutButton from "@/components/sign-out-btn";
import CategoryItemList from "@/components/category-items";
import { Settings } from "lucide-react";
import Link from "next/link";
import getUser from "@/server/users/getUser";
import NewCardButton from "./new-card-button";

export default async function HomePage() {

    const session = await getServerSession();
    const user = await getUser(session?.user.email!)

    return (
        <main className="px-3">
            <div className="flex items-center justify-between w-full">
                <div>
                    <h4 className="font-medium text-xl">Welcome Back</h4>
                    <h1 className="font-semibold text-3xl">{session?.user?.name!}</h1>
                </div>

                <Link href="/settings">
                    <Settings/>
                </Link>
            </div>

            <div className="w-full mt-4">
                <div className="w-full flex items-center justify-between mb-1">
                    <h3 className="font-semibold">My Cards</h3>
                    <Link href='/documents?filter=all'>See More</Link>
                </div>

                <NewCardButton userId={user?.id!}/>

            </div>

            <div className="w-full mt-4">
                <div className="w-full flex items-center justify-between">
                    <h3 className="font-semibold">My Uploads</h3>
                    <Link href='/documents?filter=all'>See More</Link>
                </div>

                <CategoryItemList/>
            </div>
            
            <SignOutButton/>


        </main>
    )
}
