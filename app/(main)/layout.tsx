import { Button } from "@/components/ui/button"
import { BiSolidHomeAlt2 } from "react-icons/bi"
import { FiInbox } from "react-icons/fi"
import { TbLineScan } from "react-icons/tb"

import { headers } from "next/headers";
import { urbanist } from "@/lib/utils";

import { Metadata } from "next";
import ScanButton from "./home/scan-button";
import SideMenu from "@/components/side-menu";
import DesktopHeader from "@/components/desktop-header";
import { Home, Inbox } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
    title: 'Your Dashboard',
    description: 'All your documents in one place',
}


export default function HomeLayout({ children }: {
    children: React.ReactNode
}) {

    const route = headers().get('next-url')!;

    return (
        <div className={`${urbanist.className} max-sm:pt-5 relative h-[100dvh] md:grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]`}>
            <SideMenu/>
            
            <div>
                <DesktopHeader/>

                <main>{children}</main>
            </div>


            
            <footer className="w-full md:hidden fixed bg-muted bottom-0">
                <Separator/>
                <div className="w-full grid grid-cols-3 py-2">
                    <Link className="w-full h-full flex items-center justify-center" href="/home">
                        <Home className={"h-4 w-4 " + route?.includes('home') ? 'text-slate-900': 'text-white'} />
                    </Link>
                    <ScanButton/>
                    <Link 
                        aria-disabled={true}
                        className="w-full h-full flex items-center justify-center" 
                        href="/inbox"
                    >
                        <Inbox className={"h-4 w-4 " + route?.includes('inbox') ? 'text-slate-900': 'text-white'}/>
                    </Link>
                </div>
            </footer>
        </div>
    )

}

