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


            
            <footer className="w-full md:hidden absolute bottom-0 grid grid-cols-3 bg-slate-300">
                <Button variant={"ghost"}>
                    <BiSolidHomeAlt2 className={route?.includes('home') ? 'text-slate-900': 'text-white'}/>
                </Button>
                <ScanButton/>
                <Button variant={"ghost"}>
                    <FiInbox className={route?.includes('inbox') ? 'text-slate-900': 'text-white'}/>
                </Button>
            </footer>
        </div>
    )

}

