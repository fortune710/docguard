'use client'
import { useMediaQuery } from "@/hooks/useMediaQuery"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import QRCode from "react-qr-code";

interface QRCodePopoverProps {
    children?: React.ReactNode
    documentUrl: string
}

export default function QRCodePopover({ children, documentUrl }: QRCodePopoverProps) {

    const isMobile = useMediaQuery('(max-width: 640px)');

    return (
        <>
            {
                !isMobile ? null :
                <Drawer>
                    <DrawerTrigger>
                        { children }
                    </DrawerTrigger>

                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>QR Code</DrawerTitle>
                            <DrawerDescription>
                                Scan to view your doucment
                            </DrawerDescription>
                        </DrawerHeader>

                        <div className="w-full flex items-center justify-center py-4">
                            <QRCode value={documentUrl} />
                        </div>

                        <DrawerFooter>
                            <DrawerClose className="my-4">
                                Close Drawer
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            }
        
        </>
    )
}