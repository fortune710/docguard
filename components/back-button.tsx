'use client'

import { Button } from "./ui/button"
import { useRouter } from "next/navigation"
import { ChevronLeft } from "lucide-react"

const BackButton: React.FC = () => {
    const router = useRouter();
    
    return (
        <Button 
            variant={"ghost"} 
            onClick={() => router.back()}
            className="border p-1 border-slate-300 md:hidden rounded-lg aspect-square"
        >
            <ChevronLeft className="w-5 h-5" />        
        </Button>
    )
}

export default BackButton;