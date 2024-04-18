import { ImageUploadData } from "@/types"
import { useCallback, useState } from "react"


export default function useCardCapture(){

    const [cardFront, setCardFront] = useState<ImageUploadData>({
        imageDataString: "",
        actualImageFile: null
    })    
    const [cardBack, setCardBack] = useState<ImageUploadData>({
        imageDataString: "",
        actualImageFile: null
    })

    const updateCardFront = useCallback(async (imageData: ImageUploadData) => {
        return setCardFront({ 
            imageDataString: imageData.imageDataString, 
            actualImageFile: imageData.actualImageFile 
        })
    }, [])

    const updateCardBack = useCallback(async (imageData: ImageUploadData) => {
        return setCardBack({ 
            imageDataString: imageData.imageDataString, 
            actualImageFile: imageData.actualImageFile 
        })
    }, [])

    return {
        cardFront,
        cardBack,
        updateCardFront,
        updateCardBack
    }

}