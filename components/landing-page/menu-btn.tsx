
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getServerSession } from '@/server/session'

import Link from "next/link";
import { MenuSquare } from "lucide-react";

export default async function MenuButton() {
    const session = await getServerSession();

        
    return (
        <>
            <div className="md:hidden">
                {
                    !session ? 
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
                    :
                    <Link className='py-2.5 px-7 font-semibold rounded-[36px] bg-zinc-900 text-white' href='/home'>
                        Dashboard
                    </Link>                    

                }
            </div>

            <div className='space-x-4 max-md:hidden'>
                {
                    !session ? 
                    <>
                        <Link className='py-2.5 px-7 font-semibold rounded-[36px]' href='/login'>
                            Login
                        </Link>
                        <Link className='py-2.5 px-7 font-semibold rounded-[36px] bg-zinc-900 text-white' href='/register'>
                            Sign Up
                        </Link>                    
                    </>
                    :
                    <Link className='py-2.5 px-7 font-semibold rounded-[36px] bg-zinc-900 text-white' href='/home'>
                        Dashboard
                    </Link>                    

                }
            </div>
        
        </>
    )
}