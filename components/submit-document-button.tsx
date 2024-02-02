'use client'
import { useFormStatus } from 'react-dom'
import { Button } from "@/components/ui/button";


const SubmitDocumentButton = () => {
    const { pending } = useFormStatus()
    return (
        <Button disabled={pending} type="submit">
            Upload
        </Button>
    )
}

export default SubmitDocumentButton;