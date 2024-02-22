'use client'

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { MenuSquare } from "lucide-react";

export default function MenuButton() {
    const isMobileScreen = useMediaQuery('(max-width: 768px)');
    
    if(isMobileScreen) {
        return (
            <Sheet>
                <SheetTrigger asChild>
                    <button aria-label="Menu Button">
                        <MenuSquare/>
                    </button>

                </SheetTrigger>
                <SheetContent className="flex flex-col text-center py-10" side='bottom'>
                    <Link className='py-2.5 px-7 font-semibold rounded-[36px]' href='/login'>
                        Login
                    </Link>
                    <Link className='py-2.5 px-7 font-semibold rounded-[36px] bg-zinc-900 text-white' href='/register'>
                        Sign Up
                    </Link>
                </SheetContent>
            </Sheet>
        )
    }
    
    return (
        <div className='space-x-4'>
            <Link className='py-2.5 px-7 font-semibold rounded-[36px]' href='/login'>
                Login
            </Link>
            <Link className='py-2.5 px-7 font-semibold rounded-[36px] bg-zinc-900 text-white' href='/register'>
                Sign Up
            </Link>
        </div>
    )
}