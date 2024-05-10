import DesktopHomeView from "./desktop-home-view";
import MobileHomeView from "./mobile-home-view";

interface HomePageLayoutProps {
    userId: string
}

export default async function HomePageLayout({ userId }: HomePageLayoutProps) {

    return (
        <main>
            <div className="max-md:hidden">
                <DesktopHomeView userId={userId}/>
            </div>

            <div className="md:hidden">
                <MobileHomeView userId={userId}/>
            </div>
        </main>

    )
}