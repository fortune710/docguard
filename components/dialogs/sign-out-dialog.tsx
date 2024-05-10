'use client'

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import React from "react";
import { signOut } from "next-auth/react"

interface SignOutDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function SignOutDialog({ open, onOpenChange }: SignOutDialogProps) {
    return (
        <AlertDialog open={open} onOpenChange={onOpenChange}>

            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Sign Out</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to sign out?
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => signOut({ callbackUrl: "/login" })}>
                        Confirm
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        
        </AlertDialog>
    )
}