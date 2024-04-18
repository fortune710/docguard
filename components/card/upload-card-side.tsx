'use client'

import { Button } from "../ui/button"
import { CreditCard, Upload, X } from "lucide-react"
import CameraPrompt from "../camera-prompt"
import { ImageUploadData } from "@/types"

interface UploadCardSideProps {
    uploaded: boolean,
    cardSide?: 'front'|'back'
    setCardSideData?: (cardSideData: ImageUploadData) => any
}
export default function UploadCardSide({ cardSide, uploaded, setCardSideData }: UploadCardSideProps) {
    
    
    if (!uploaded) {
        return (
            <CameraPrompt updateImage={setCardSideData!}>
                <button
                    className="w-full p-3 bg-muted border border-dashed border-slate-300 rounded-md flex flex-col items-center"
                    type="button"
                >
                    <Upload className="h-4 w-4 font-semibold"/>
                    <h2 className="text-primary text-lg font-semibold">Click to upload</h2>
                    <div className="flex flex-col text-xs">
                        <span>PNG, JPEG, JPEG accepted</span>
                        <span>Ensure your card is captured properly and readbale</span>
                    </div>
                </button>
            </CameraPrompt>
        )
    }
    
    return (
        <div className="w-full p-2 border border-muted rounded-md grid grid-cols-[10%_auto_10%] items-center">
            <CreditCard className="w-6 h-6"/>

            <div className="flex flex-col">
                <span className="capitalize text-sm">
                    {cardSide || 'Card'} Side
                </span>
                <span className="text-xs">Uploaded</span>
            </div>

            <Button 
                onClick={() => setCardSideData!({ imageDataString: "", actualImageFile: null })}
                className="bg-white hover:bg-white/80" variant="default" size="icon">
                <X className="w-4 h-4 text-black"/>
            </Button>
        </div>
    )
}