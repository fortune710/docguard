import { Button } from "@/components/ui/button"
import { BiSolidHomeAlt2 } from "react-icons/bi"
import { FaHome } from "react-icons/fa"
import { FiInbox } from "react-icons/fi"
import { TbLineScan } from "react-icons/tb"

import { headers } from "next/headers";
import { urbanist } from "@/lib/utils"

export default function HomeLayout({ children }: {
    children: React.ReactNode
}) {

    const route = headers().get('next-url')!;

    return (
        <main className={`${urbanist.className} pt-5 relative h-[100dvh]`}>
            {children}

            <footer className="w-full absolute bottom-0 grid grid-cols-3 bg-slate-300">
                <Button variant={"ghost"}>
                    <BiSolidHomeAlt2 className={route?.includes('home') ? 'text-slate-900': 'text-white'}/>
                </Button>
                <Button variant={"ghost"}>
                    <TbLineScan/>
                </Button>
                <Button variant={"ghost"}>
                    <FiInbox className={route?.includes('inbox') ? 'text-slate-900': 'text-white'}/>
                </Button>
            </footer>
        </main>
    )

}