import Link from "next/link"
import {
  Bell,
  Home,
  Inbox,
  LibraryBig,
  LineChart,
  Package,
  Package2,
  ScanLine,
  ShoppingCart,
  Users,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import Image from "next/image"




export default function SideMenu() {
    return (
        <div className="hidden border-r bg-muted/40 md:block">
            <div className="flex h-full max-h-screen flex-col gap-2">
                <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                    <Link href="/" className="flex items-center gap-2 font-semibold">
                        <Image 
                            src="/docguard.png" 
                            alt="DocGuard Logo"
                            width={120}
                            height={25}
                        />
                    </Link>
                    <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                        <Bell className="h-4 w-4" />
                        <span className="sr-only">Toggle notifications</span>
                    </Button>
                </div>
                <div className="flex-1">
                    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                        <Link
                            href="/home"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Home className="h-4 w-4" />
                            Home
                        </Link>
                        <Link
                            href="/documents?filter=all"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <LibraryBig className="h-4 w-4" />
                            Documents
                        </Link>
                        <Link
                            href="/scan"
                            className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                        >
                            <ScanLine className="h-4 w-4" />
                            Scan
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <Inbox className="h-4 w-4" />
                            Inbox
                        </Link>
                        <Link
                            href="#"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                        >
                            <LineChart className="h-4 w-4" />
                            Analytics
                        </Link>
                    </nav>
                </div>
                {
                    /*
                    
                    
                    <div className="mt-auto p-4">
                        <Card x-chunk="dashboard-02-chunk-0">
                        <CardHeader className="p-2 pt-0 md:p-4">
                            <CardTitle>Upgrade to Pro</CardTitle>
                            <CardDescription>
                            Unlock all features and get unlimited access to our support
                            team.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                            <Button size="sm" className="w-full">
                            Upgrade
                            </Button>
                        </CardContent>
                        </Card>
                    </div>
                    
                    */
                }
            </div>
        </div>
    )
}