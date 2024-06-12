"use client"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"  
import { Button } from "@/components/ui/button"
import SignOutDialog from "./dialogs/sign-out-dialog";
import { useState } from "react";


interface UserDropdownProps {
    image: string,
    name: string,
}

export default function UserDropdown({ image, name }: UserDropdownProps) {
    const [openDialog, setDialog] = useState(false);
    
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="secondary" size="icon" className="rounded-full">
                        <Avatar className="max-md:w-12 max-md:h-12">
                            <AvatarImage src={image!} alt="Your Profile Picture"/>
                            <AvatarFallback>{name?.at(0)!}</AvatarFallback>
                        </Avatar>
                        <span className="sr-only">Toggle user menu</span>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuItem>Support</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        onClick={() => setDialog(true)}
                    >
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <SignOutDialog
                open={openDialog}
                onOpenChange={(open) => setDialog(open)}
            />
        
        </>
    )
}