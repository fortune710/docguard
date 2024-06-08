import { useState } from "react"
import DrawerOrDialog from "./drawer-or-dialog"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useRouter } from "next/navigation";
import { AlertDialog, AlertDialogContent } from "./ui/alert-dialog";

interface VerifyUserProps {
    open: boolean,
    onOpenChange?: (open: boolean) => any,
    userEmail: string,
}

const VerifyUser = ({ userEmail, ...props }: VerifyUserProps) => {

    const [code, setCode] = useState<string>("");
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmitCode = async () => {
        const response = await fetch(`/api/verify?code=${code}&user_email=${userEmail}`)
        if (response.status === 200) {
            await response.json()
            return router.push('/welcome')
        }

        const { data, message } = await response.json();
        return toast({
            title: "Error with OTP",
            description: message,
            variant: "destructive"
        })
        
    }

    const handleResend = async () => {
        const response = await fetch(`/api/verify/resend?user_email=${userEmail}`)
        if (response.status === 200) {
            const { message } = await response.json();
            return toast({
                description: message,
                title: "Verification Resent"
            })
        }

        const { message } = await response.json();
        return toast({
            title: "Error with Resend",
            description: message,
            variant: "destructive"
        })
    }


    return (
        <AlertDialog {...props}>
            <AlertDialogContent>
                <div className="space-y-2">
                    <h2 className="text-xl font-semibold font-inter">Verify Your Email</h2>
                    <InputOTP 
                        maxLength={6}
                        value={code}
                        onChange={(value) => setCode(value)}
                    >
                        <InputOTPGroup>
                            <InputOTPSlot index={0}/> 
                            <InputOTPSlot index={1}/>            
                            <InputOTPSlot index={2}/>            
                            <InputOTPSlot index={3}/>            
                            <InputOTPSlot index={4}/>            
                            <InputOTPSlot index={5}/>                       
                        </InputOTPGroup>
                    </InputOTP>

                    <div className="text-sm">
                        Please enter the OTP sent to you email
                    </div>

                    <div className="space-y-2">
                        <Button onClick={handleSubmitCode}>
                            Verify Code
                        </Button>

                        <Button onClick={handleResend} variant="ghost">
                            Resend OTP
                        </Button>
                    </div>
                </div>

            </AlertDialogContent>
        </AlertDialog>
    )
}

export default VerifyUser;