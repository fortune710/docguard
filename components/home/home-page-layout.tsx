import DesktopHomeView from "./desktop-home-view";
import MobileHomeView from "./mobile-home-view";
import { getUserFromSession } from "@/server/session";


export default async function HomePageLayout() {
    const user = await getUserFromSession();

    return (
        <main>
            <div className="max-md:hidden">
                <DesktopHomeView userId={user?.id!}/>
            </div>

            <div className="md:hidden">
                <MobileHomeView userId={user?.id!}/>
            </div>
        </main>

    )
}