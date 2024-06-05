import ProfilePicture from "./profile-picture"
import { getUserFromSession } from "@/server/session"
import SearchModal from "./search/search-modal"



export default async function DesktopHeader() {
    const user = await getUserFromSession()


    return (
        <header className="flex h-14 max-sm:hidden items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <div className="flex items-center w-full justify-between">
                <SearchModal userId={user?.id!}/>

                <ProfilePicture
                    profilePicture={user?.image!}
                    name={user?.name!}
                />            
            </div>
        </header>
    )
}