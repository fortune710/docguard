import { getServerSession } from "next-auth";
import findUsersDocuments from "@/server/documents/findUsersDocuments";

import { Button } from "@/components/ui/button";
import SignOutButton from "@/components/sign-out-btn";
import CategoryItemList from "@/components/category-items";
import { Settings } from "lucide-react";
import Link from "next/link";

export default async function HomePage() {

    const session = await getServerSession();


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
