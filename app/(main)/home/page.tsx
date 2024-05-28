import HomePageLayout from "@/components/home/home-page-layout";
import { getUserFromSession } from "@/server/session";
import ProfilePicture from "@/components/profile-picture";


export default async function HomePage() {
    const user = await getUserFromSession();


    return (
        <main className="px-3">
            <div className="flex items-center justify-between w-full">
                <div className="my-2 md:my-4">
                    <h4 className="font-medium text-xl">Welcome Back</h4>
                    <h1 className="font-semibold text-3xl">{user?.name!}</h1>
                </div>

                <div className="md:hidden">
                    <ProfilePicture
                        name={user?.name!}
                        profilePicture={user?.image!}
                    />
                </div>
            </div>

            <HomePageLayout userId={user?.id!}/>

        </main>
    )
}
