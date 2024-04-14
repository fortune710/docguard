'use client'

import { useSearchParams } from "next/navigation"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import QRCode from "react-qr-code";
import { useEffect, useState } from "react";

export default function QRCodePageDesktop() {
    const searchParams = useSearchParams();
    const url = searchParams.get('url');
    const [broswerWindow, setWindow] = useState<typeof window>();

    useEffect(() => {
        setWindow(window);
    }, [])

    if (!url) {
        return (
            <Dialog open>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>QR Code</DialogTitle>
                        <DialogDescription>
                            Scan to view your doucment
                        </DialogDescription>
                    </DialogHeader>

                    <div className="w-full flex items-center justify-center py-4">
                        <h1>No URL Detected</h1>
                        <p>Include a URL in the search params</p>
                    </div>

                    <DialogFooter>
                        <DialogClose onClick={() => broswerWindow?.close()}>
                            Close Tab
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }
    return (
        <main>
            <Dialog open>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>QR Code</DialogTitle>
                        <DialogDescription>
                            Scan to view your doucment
                        </DialogDescription>
                    </DialogHeader>

                    <div className="w-full flex items-center justify-center py-4">
                        <QRCode value={url!} />
                    </div>

                    <DialogFooter>
                        <DialogClose onClick={() => broswerWindow?.close()}>
                            Close Tab
                        </DialogClose>
                    </DialogFooter>

                </DialogContent>

            </Dialog>
        </main>
    )
}