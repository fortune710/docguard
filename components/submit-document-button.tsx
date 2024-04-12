'use client'
import { useFormStatus } from 'react-dom'
import { Button } from "@/components/ui/button";


const SubmitDocumentButton = () => {
    const { pending } = useFormStatus();

    return (
        <Button className='w-full my-5 md:w-auto md:my-0' disabled={pending} type="submit">
            Upload
        </Button>
    )
}

export default SubmitDocumentButton;