import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface DrawerOrDialogProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    title: string;
    description?: string;
}

export default function DrawerOrDialog({ trigger, children, title, description }: DrawerOrDialogProps) {

    return (
        <>
            <div  className="sm:hidden">
                <Drawer>
                    <DrawerTrigger  className="w-full">
                        { trigger }
                    </DrawerTrigger>

                    <DrawerContent>
                        <DrawerHeader>
                            <DrawerTitle>{title}</DrawerTitle>
                            { 
                                description && 
                                <DrawerDescription>{description}</DrawerDescription> 
                            }                        
                        </DrawerHeader>

                        {children}

                        <DrawerFooter>
                            <DrawerClose className="bg-black text-white rounded-md text-lg py-2 font-semibold">
                                Close
                            </DrawerClose>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>

            <div  className="max-sm:hidden">
                <AlertDialog>
                    <AlertDialogTrigger className="w-full">
                        { trigger }
                    </AlertDialogTrigger>

                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>{title}</AlertDialogTitle>
                            { 
                                description && 
                                <AlertDialogDescription>{description}</AlertDialogDescription> 
                            }                        
                        </AlertDialogHeader>

                        {children}

                        <AlertDialogFooter>
                            <AlertDialogCancel>Close</AlertDialogCancel>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        
        </>
    )
}